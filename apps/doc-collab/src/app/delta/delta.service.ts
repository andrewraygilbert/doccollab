import { Injectable } from '@angular/core';
import { CoreSocketService } from '../socket/core-socket.service';
import { DeltaDto } from '@doccollab/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DeltaService {

  private socketId: string;
  private localDeltaTracker = 0;
  private outgoingDeltaRecord: any = [];
  private incomingDeltaRecord: any = [];

  constructor(
    private coreSocket: CoreSocketService,
  ) { }

  public setSocketId(socketId: string) {
    this.socketId = socketId;
  }

  /**
   * PROCESS INCOMING DELTAS
   */

  // main handler function
  public incomingDelta(delta: DeltaDto): DeltaDto {
    this.addToIncomingDeltas(delta);
    return this.compareDeltaStates(delta);
  }

  // add the incoming delta to the local record for deltas from external sockets
  private addToIncomingDeltas(delta: DeltaDto) {
    const index = this.getLastIncomingDelta(delta.socketId);
    // if no prior delta for socket in record, push delta into local record
    if (index === -1) {
      this.incomingDeltaRecord.push(delta);
    // if prior delta in record, then replace it with the new delta
    } else {
      this.incomingDeltaRecord.splice(index, 1, delta);
    }
  }

  // determine whether local state matches state of incoming delta
  private compareDeltaStates(delta: DeltaDto) {
    const lastDelta = this.getLastDelta(delta);
    // if no prior delta for this socket exists
    if (!lastDelta) {
      // if no local changes have been made, return delta unchanged
      if (this.localDeltaTracker === 0) {
        return delta;
      // if local changes made but no prior delta -> cannot compare states -> reconcile
      } else {
        return this.reconcile(delta);
      }
    // a prior delta from this socket exists and its state matches local state
    } else if (lastDelta.localId === this.localDeltaTracker) {
      // states match, so return delta unchanged
      return delta;
    // states do not match -> reconcile
    } else {
      // in all other cases, reconcile delta to be sure
      return this.reconcile(delta, lastDelta);
    }
  }

  // get the last delta from this socket
  private getLastIncomingDelta(extSocketId: string) {
    return this.incomingDeltaRecord.findIndex((delta_i: DeltaDto) => delta_i.socketId === extSocketId );
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
    const diffDeltas = this.outgoingDeltaRecord.slice(lastDelta ? lastDelta.localId + 1 : []); // returns the deltas that have been performed that the incoming delta was unaware of
    console.log('diffDeltas', diffDeltas);
    let netChange = 0;
    // iterate through each local delta that needs to be reconciled with incoming delta
    for (const delta_i of diffDeltas) {
      // only incorporate local delta if it occurred at i < incoming index
      if (delta_i.ops[0].retain < incomingIndex) {
        for (const op of delta_i.ops) {
          // increase the incoming index for each insertion operation
          if (op.insert) {
            netChange = netChange + op.insert.length;
          }
          // reduce the incoming index for each deletion operation
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

  /**
   * OUTGOING DELTAS
   */

  // prepares and sends out a delta
  public outgoingDelta(delta: any) {
    this.addLocalDelta(delta);
    delta.socketId = this.socketId;
    delta.localId = this.localDeltaTracker;
    delta.localState = this.incomingDeltaRecord;
    this.localDeltaTracker++;
    return delta;
  }

  // add local delta to local state tracker
  public addLocalDelta(delta: any): void {
    this.outgoingDeltaRecord.push(delta);
  }

  /**
   * GENERAL HELPERS
   */

  public resetAllDeltas(): void {
    this.outgoingDeltaRecord = [];
    this.incomingDeltaRecord = [];
  }

}
