import { Injectable, ɵConsole } from '@angular/core';
import { CoreSocketService } from '../socket/core-socket.service';
import { DeltaDto, BaseDelta } from '@doccollab/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DeltaService {

  private socketId: string;
  private localDeltaTracker = 0;
  private outgoingDeltaRecord: BaseDelta[] = [];
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

  // determine whether an incoming delta can be reconciled
  public canReconcileDelta(delta: DeltaDto): boolean {
    let loopIndex = 0;
    for (const extSocket of delta.localRecord) { // iterate over each socket in incoming delta's record
      console.log('extSocket', extSocket);
      const socketIndex = this.incomingDeltaRecord.findIndex((socket_i: any) => socket_i.socketId === extSocket.socketId);
      console.log('socketIndex', socketIndex);
      if (socketIndex === -1) { // the socket doesn't exist in local record; can't reconcile
        if (extSocket.socketId === this.socketId) { // skip the record for this socket since it is not in incomingDeltaRecord
          loopIndex++;
        } else {
          break;
        }
      } else { // the socket exists in the local record; check deltas
        const lastDeltaIdSocket = extSocket.deltaId;
        const length = this.incomingDeltaRecord[socketIndex].deltas.length;
        const lastDeltaIdLocal = this.incomingDeltaRecord[socketIndex].deltas[length - 1].localId;
        if (lastDeltaIdSocket > lastDeltaIdLocal) { // incoming delta contains deltas that do not exist locally; can't reconcile
          console.log('deltas that do not exist locally');
          break;
        } else { // all deltas in incoming delta exist locally; can reconcile for this external socket
          loopIndex++;
        }
      }
    };
    if (loopIndex === delta.localRecord.length) { // every delta in incoming delta exists locally; CAN incoming delta
      return true;
    }
    return false; // at least one delta from one external socket does not exist locally; CANNOT reconcile; must queue delta
  }

  public processDelta(delta: DeltaDto): DeltaDto {
    const reconciled = this.identifyDiscrepancies(delta);
    this.recordIncomingDeltas(delta);
    return reconciled;
  }

  // record incoming deltas locally for reconciliation
  private recordIncomingDeltas(delta: DeltaDto) {
    const socketIndex = this.getSocketIndex(delta);
    if (socketIndex === -1) {
      this.addNewSocketRecord(delta);
    } else {
      this.incomingDeltaRecord[socketIndex].deltas.push(delta);
    }
  }

  // create a new record for the first delta from a socket
  private addNewSocketRecord(delta: DeltaDto) {
    const newSocketRecord = {
      socketId: delta.socketId,
      deltas: [delta]
    };
    this.incomingDeltaRecord.push(newSocketRecord);
  }

  // checks for discrepancies in third party sockets
  private checkExtDiscrepancies(delta: DeltaDto) {
    let diffDeltas: any = [];
    for (const socket_i of this.incomingDeltaRecord) {
      if (socket_i.socketId !== delta.socketId) { // do not check the socket that originated this delta
        const extSocketRecord = delta.localRecord.find(extSocket_i => extSocket_i.socketId === socket_i.socketId);
        if (!extSocketRecord) { // no record for this socket in incoming delta; all discrepant
          for (const eachDelta of socket_i.deltas) {
            diffDeltas.push(eachDelta);
          }
        } else { // record exists in incoming delta -> check delta ids
          const lastExtDeltaId = extSocketRecord.deltaId; // get the last delta id for this socket
          const lastIntDeltaId = socket_i.deltas[socket_i.deltas.length-1].localId;
          if (lastIntDeltaId > lastExtDeltaId) { // if local state has changes that are not present in incoming delta, add to diff deltas array
            const slice = socket_i.deltas.slice(lastExtDeltaId + 1);
            for (const each of slice) {
              diffDeltas.push(each);
            };
          }
        }
      }
    }
    return diffDeltas;
  }

  // checks for discrepancies with this socket
  private checkIntDiscrepancies(delta: DeltaDto, diffDeltas: any[]) {
    const lastDeltaForThisSocket = delta.localRecord.find((socket_i) => socket_i.socketId === this.socketId);
    if (!lastDeltaForThisSocket && this.localDeltaTracker > 0) {
      for (const eachDelta of this.outgoingDeltaRecord) {
        diffDeltas.push(eachDelta);
      }
    } else if (lastDeltaForThisSocket && lastDeltaForThisSocket.deltaId && lastDeltaForThisSocket.deltaId < this.localDeltaTracker) {
      const diff = this.outgoingDeltaRecord.slice(lastDeltaForThisSocket.deltaId + 1);
      for (const eachDelta of diff) {
        diffDeltas.push(eachDelta);
      };
    }
    return diffDeltas;
  }

  // check for discrepancies in delta states
  private identifyDiscrepancies(delta: DeltaDto): DeltaDto {
    let diffDeltas = this.checkExtDiscrepancies(delta);
    diffDeltas = this.checkIntDiscrepancies(delta, diffDeltas);
    console.log('diffDeltas', diffDeltas);
    if (diffDeltas.length > 0) { // if discrepancies, reconcile
      return this.reconciler(delta, diffDeltas);
    }
    return delta;
  }

  private reconciler(delta: DeltaDto, diffDeltas: DeltaDto[]): DeltaDto {
    let netIndexChange = 0;
    const incomingIndex = this.getIncomingIndex(delta);
    console.log('incoming index', incomingIndex);
    for (const delta_i of diffDeltas) { // for each discrepant delta
      console.log('delta_i', delta_i);
      if (delta_i.ops[0].retain < incomingIndex) { // if local change occurred at i before incoming delta
        for (const op of delta_i.ops) {
          // increase the incoming index for each insertion operation
          if (op.insert) {
            netIndexChange = netIndexChange + op.insert.length;
          }
          // reduce the incoming index for each deletion operation
          if (op.delete) {
            netIndexChange = netIndexChange - op.delete;
          }
        }
      }
    };
    console.log('netIndexChange', netIndexChange);
    if (delta.ops[0].retain) {
      delta.ops[0].retain = delta.ops[0].retain + netIndexChange;
    }
    return delta;
  }

  private getIncomingIndex(delta: DeltaDto): number {
    if (delta.ops[0].retain) {
      if (delta.ops[0].attributes) {
        return 0;
      }
      return delta.ops[0].retain;
    }
    return 0;
  }

  // retrieve the index of a record for a socket
  private getSocketIndex(delta: DeltaDto): number {
    return this.incomingDeltaRecord.findIndex((socket_i: any) => socket_i.socketId === delta.socketId);
  }

  /**
   * OUTGOING DELTA HANDLERS
   */

  public processDeltaOut(delta: BaseDelta): DeltaDto {
    const deltaDto: DeltaDto = {
      socketId: this.socketId,
      localId: this.localDeltaTracker,
      ops: delta.ops,
      localRecord: this.buildLocalRecord()
    };
    this.addLocalDelta(delta);
    console.log({'deltaDto': deltaDto});
    return deltaDto;
  }

  private buildLocalRecord() {
    let record = [];
    for (const socket of this.incomingDeltaRecord) {
      let socketRecord: any = {};
      socketRecord.socketId = socket.socketId;
      socketRecord.deltaId = socket.deltas[socket.deltas.length-1].localId;
      record.push(socketRecord);
    }
    return record;
  }

  // add local delta to local state tracker
  public addLocalDelta(delta: any): void {
    this.outgoingDeltaRecord.push(delta);
    this.localDeltaTracker++;
  }

  /**
   * GENERAL HELPERS
   */

  public resetAllDeltas(): void {
    this.outgoingDeltaRecord = [];
    this.incomingDeltaRecord = [];
  }

}
