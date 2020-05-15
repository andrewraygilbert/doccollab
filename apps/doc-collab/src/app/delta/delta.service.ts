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
    return delta;
  }

  private addToExternalDeltas(delta: DeltaDto) {
    const index = this.checkExternalDelta(delta.socketId);
    if (index === -1) {
      this.externalDeltas.push(delta);
    } else {
      this.externalDeltas.splice(index, 1, delta);
    }
  }

  private checkExternalDelta(extSocketId: string) {
    return this.externalDeltas.findIndex((delta_i: DeltaDto) => delta_i.socketId === extSocketId );
  }

  private compareDeltaStates(delta: DeltaDto) {
    const lastDelta = this.getLastDelta(delta);
    if (!lastDelta) {
      return this.reconcile(delta);
    } else if (lastDelta.localId === this.deltaTracker) {
      return delta;
    } else {
      return this.reconcile(delta, lastDelta);
    }
  }

  private reconcile(delta: DeltaDto, lastDelta?: DeltaDto) {
    console.log('lastDelta', lastDelta);
    const incomingIndex = delta.ops[0].retain ? delta.ops[0].retain : 0;
    console.log('incomingIndex', incomingIndex); // gets the index of the incoming delta
    const diffDeltas = this.localDeltas.slice(lastDelta ? lastDelta.localId + 1 : []); // returns the deltas that have been performed that the incoming delta was unaware of
    console.log('diffDeltas', diffDeltas);
    let netChange = 0;
    for (const delta_i of diffDeltas) {
      if (delta_i.ops[0].retain < incomingIndex) {
        if (delta_i.ops[1].insert) {
          netChange = netChange + delta_i.ops[1].insert.length;
        }
        if (delta_i.ops[1].delete) {
          netChange = netChange - delta_i.ops[1].delete;
        }
      }
    };
    console.log('netChange', netChange);
    if (delta.ops[0].retain) {
      delta.ops[0].retain = delta.ops[0].retain + netChange;
    }
    return delta;
  }

  private getLastDelta(delta: DeltaDto): DeltaDto | null {
    const lastDelta = delta.localState.find(delta_i => delta_i.socketId === this.socketId);
    if (!lastDelta) {
      return null;
    }
    return lastDelta;
  }

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
