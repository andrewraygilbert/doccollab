import { Injectable, ɵConsole } from '@angular/core';
import { CoreSocketService } from '../socket/core-socket.service';
import { DeltaDto, BaseDelta, DeltaDtoRecord, DeltaRecord } from '@doccollab/api-interfaces';
import { last } from 'rxjs/operators';

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

  public getSocketId() {
    return this.socketId;
  }

  /**
   * PROCESS INCOMING DELTAS
   */

  // verify that incoming delta can be reconciled
  public reconciliable(delta: DeltaDto): boolean {
    let loopIndex = 0;
    const intRecord: DeltaRecord = this.incomingDeltaRecord.find((record_i: DeltaRecord) => record_i.socketId === delta.socketId);
    if (intRecord && intRecord.deltas.length > 0) {
      const lastId = intRecord.deltas[intRecord.deltas.length - 1].localId;
      if (delta.localId > lastId + 1) {
        console.log('missing prev delta; wait to recon');
        return false;
      }
    }
    if (delta.localRecord.length === 0) {
      return true;
    } else {
      for (const extRecord of delta.localRecord) { // iterate over each external record
        if (extRecord.socketId === this.socketId) { // skip context socket
          loopIndex++;
        } else {
          const matched = this.matchSockets(extRecord);
          if (matched) { // socket and delta exist locally
            loopIndex++;
          } else {
            console.log('no matched socket; not ready');
            return false;
          }
        }
      };
      if (loopIndex === delta.localRecord.length) {
        return true;
      }
      console.log('something missing; not ready');
      return false;
    }

  }

  // verify that incoming delta's sockets exist locally
  private matchSockets(extRecord: DeltaDtoRecord): boolean {
    const internalIndex = this.incomingDeltaRecord.findIndex((intRecord: any) => intRecord.socketId === extRecord.socketId);
    if (internalIndex === -1) { // incoming delta contains sockets that do not exist locally
      return false;
    } else {
      return this.matchDeltas(extRecord.deltaId, this.incomingDeltaRecord[internalIndex].deltas);
    }
  }

  // verify that incoming delta's deltas exist locally
  private matchDeltas(lastExtDeltaId: number, intRecordDeltas: any): boolean {
    const lastIntDeltaId = intRecordDeltas[intRecordDeltas.length - 1].localId;
    if (lastExtDeltaId > lastIntDeltaId) { // incoming delta contains deltas that do not exist locally
      console.log('missing deltas; not ready');
      return false;
    }
    return true;
  }

  // main handler function for processing delta
  public processDelta(delta: DeltaDto): DeltaDto | null {
    if (this.isDuplicateDelta(delta)) {
      return null;
    }
    const reconciled = this.identifyDiscrepancies(delta);
    this.recordIncomingDeltas(delta);
    return reconciled;
  }

  private isDuplicateDelta(delta: DeltaDto): boolean {
    const intRecord = this.incomingDeltaRecord.find((socket_i: DeltaRecord) => socket_i.socketId === delta.socketId);
    if (intRecord && intRecord.deltas.length > 0) {
      if (delta.localId <= intRecord.deltas[intRecord.deltas.length - 1].localId) {
        console.log('this is a duplicate delta', delta);
        return true;
      }
      return false;
    }
    return false;
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
    console.log('lastDeltaForThisSocket', lastDeltaForThisSocket);
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
    console.log('diffDeltas post ext', diffDeltas);
    diffDeltas = this.checkIntDiscrepancies(delta, diffDeltas);
    console.log('diffDeltas post all', diffDeltas);
    if (diffDeltas.length > 0) { // if discrepancies, reconcile
      return this.reconciler(delta, diffDeltas);
    }
    return delta;
  }

  // reconcile an incoming delta
  private reconciler(delta: DeltaDto, diffDeltas: DeltaDto[]): DeltaDto {
    let netIndexChange = 0;
    const incomingIndex = this.getIncomingIndex(delta);
    for (const delta_i of diffDeltas) { // for each discrepant delta
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

  // return the starting index for the delta
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
    const newDelta = {
      localId: this.localDeltaTracker,
      ops: delta.ops,
    };
    this.outgoingDeltaRecord.push(newDelta);
    this.localDeltaTracker++;
  }

  /**
   * GENERAL HELPERS
   */

  public resetAllDeltas(): void {
    this.outgoingDeltaRecord = [];
    this.incomingDeltaRecord = [];
  }

  public getIncomingRecord() {
    console.log('getIncomingRecord', this.incomingDeltaRecord);
    return this.incomingDeltaRecord;
  }

  public getOutgoingRecord() {
    console.log('getOutgoingRecord', this.outgoingDeltaRecord);
    return this.outgoingDeltaRecord;
  }

  public setIncomingRecord(activeDoc: any) {
    this.incomingDeltaRecord = activeDoc.incomingRecord;
    this.incomingDeltaRecord.push({
      socketId: activeDoc.fromSocketId,
      deltas: activeDoc.outgoingRecord
    });
    console.log({
      localIncoming: this.incomingDeltaRecord,
      localOutgoing: this.outgoingDeltaRecord
    });
  }

}
