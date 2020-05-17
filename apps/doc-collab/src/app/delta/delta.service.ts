import { Injectable } from '@angular/core';
import { CoreSocketService } from '../socket/core-socket.service';
import { DeltaDto } from '@doccollab/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DeltaService {

  public localDeltas: any = [];
  private deltaTracker = 0;
  public externalDeltas: any = [];
  private socketId: string;

  constructor(
    private coreSocket: CoreSocketService,
  ) { }

  public setSocketId(socketId: string) {
    this.socketId = socketId;
  }

  public addLocalDelta(delta: any): void {
    this.localDeltas.push(delta);
  }

  public incomingDelta(delta: DeltaDto): DeltaDto {
    this.addToExternalDeltas(delta);
    return this.compareDeltaStates(delta);
  }

  // add the incoming delta to the local record for the external socket
  private addToExternalDeltas(delta: DeltaDto) {
    const index = this.checkExternalDelta(delta.socketId);
    // if no delta for socket in local state, push delta into local state
    if (index === -1) {
      this.externalDeltas.push(delta);
    // if delta in state, then replace it with the new one
    } else {
      this.externalDeltas.splice(index, 1, delta);
    }
  }

  // check for delta for this socket in local state
  private checkExternalDelta(extSocketId: string) {
    return this.externalDeltas.findIndex((delta_i: DeltaDto) => delta_i.socketId === extSocketId );
  }

  // determine whether local state matches state of incoming delta
  private compareDeltaStates(delta: DeltaDto) {
    const lastDelta = this.getLastDelta(delta);
    if (!lastDelta) {
      if (this.deltaTracker === 0) {
        // no local changes have been made, so states match; return delta unchanged
        return delta;
      } else {
        // local changes have been made, but no last delta; state discrepancy; reconcile
        return this.reconcile(delta);
      }
    } else if (lastDelta.localId === this.deltaTracker) {
      // states match, so return delta unchanged
      return delta;
    } else {
      // in all other cases, reconcile delta to be sure
      return this.reconcile(delta, lastDelta);
    }
  }

  // gets the starting index of the incoming delta
  private getIncomingIndex(delta: DeltaDto): number {
    if (delta.ops[0].retain) {
      if (delta.ops[0].attributes) {
        return 0;
      }
      return delta.ops[0].retain;
    }
    return 0;
  }

  // reconciles the incoming starting index to account for local state changes
  private reconcile(delta: DeltaDto, lastDelta?: DeltaDto) {
    const incomingIndex = this.getIncomingIndex(delta);
    console.log('incomingIndex', incomingIndex);
    const diffDeltas = this.localDeltas.slice(lastDelta ? lastDelta.localId + 1 : []); // returns the deltas that have been performed that the incoming delta was unaware of
    console.log('diffDeltas', diffDeltas);
    let netChange = 0;
    // iterate through each local delta that needs to be reconciled with incoming delta
    for (const delta_i of diffDeltas) {
      // only incorporate local delta if it occurred at i < incoming index
      if (delta_i.ops[0].retain < incomingIndex) {
        for (const op of delta_i.ops) {
          if (op.insert) {
            netChange = netChange + op.insert.length;
          }
          if (op.delete) {
            netChange = netChange - op.delete;
          }
        }
      }
    };
    // override the incoming delta's index with the reconciled index
    console.log('netChange', netChange);
    if (delta.ops[0].retain) {
      delta.ops[0].retain = delta.ops[0].retain + netChange;
    }
    return delta;
  }

  // gets the last delta from this socket that the external socket was aware of when it sent this delta
  private getLastDelta(delta: DeltaDto): DeltaDto | null {
    const lastDelta = delta.localState.find(delta_i => delta_i.socketId === this.socketId);
    if (!lastDelta) {
      return null;
    }
    return lastDelta;
  }

  // prepares and sends out a delta
  public outgoingDelta(delta: any) {
    this.addLocalDelta(delta);
    delta.socketId = this.socketId;
    delta.localId = this.deltaTracker;
    delta.localState = this.externalDeltas;
    this.deltaTracker++;
    return delta;
  }

  public resetAllDeltas(): void {
    this.localDeltas = [];
    this.externalDeltas = [];
  }

}
