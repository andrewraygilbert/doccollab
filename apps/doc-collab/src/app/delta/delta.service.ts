import { Injectable } from '@angular/core';
import { CoreSocketService } from '../socket/core-socket.service';
import { DeltaDto, BaseDelta, DeltaDtoRecord, DeltaRecord, PurgeRecord } from '@doccollab/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DeltaService {

  private socketId: string;
  private socketIdMod: string;
  private socketCounter = 0;
  private localDeltaTracker = 0;
  private outgoingDeltaRecord: DeltaDto[] = [];
  private incomingDeltaRecord: DeltaRecord[] = [];
  private purgeInterval: any;

  constructor(
    private coreSocket: CoreSocketService,
  ) { }

  /**
   * SOCKET ID MANAGERS
   */

  public setSocketId(socketId: string) {
    if (this.socketId !== socketId) {
      this.socketId = socketId;
      this.socketIdMod = socketId;
      this.socketCounter = 0;
    }
  }

  public setSocketIdMod() {
    this.socketIdMod = `${this.socketId}VER${this.socketCounter}`;
    this.socketCounter++;
    console.log('setting socketIdMod', this.socketIdMod);
  }

  public getSocketId() {
    return this.socketId;
  }


  public getSocketIdMod() {
    return this.socketIdMod;
  }

  /**
   * CHECK DELTA RECONCILIABILITY
   */

  // verify that incoming delta can be reconciled
  public reconciliable(delta: DeltaDto): boolean {
    console.log('incomingDeltaRecord', this.incomingDeltaRecord);
    if (!this.matchOriginDeltas(delta)) { // match deltas from origin socket
      return false;
    }
    if (delta.localRecord.length === 0) { // no local record in origin socket
      return true;
    }
    return this.matchExternalDeltas(delta); // match external deltas
  }

  // verifies that the state of the incoming delta exists in context socket
  private matchExternalDeltas(delta: DeltaDto): boolean {
    for (const externalRecord of delta.localRecord) {
      if (externalRecord.socketId !== this.socketIdMod) { // skip context socket
        const matched = this.matchSockets(externalRecord);
        if (!matched) {
          return false; // socket record or delta missing
        }
      }
    };
    return true;
  }

  // verifies that this delta is the next delta in the sequence from origin socket
  private matchOriginDeltas(delta: DeltaDto): boolean {
    const originRecord = this.getIntSocketRecord(delta.socketId);
    if (originRecord && originRecord.deltas.length > 0) { // deltas exist locally
      const lastDeltaId = originRecord.deltas[originRecord.deltas.length - 1].localId;
      if (delta.localId > lastDeltaId + 1) {
        console.log('!Reconcile -> missing previous deltas', delta.localId, lastDeltaId + 1);
        return false; // delta is too far ahead of local state to reconcile
      }
    }
    return true;
  }

  // verify that incoming delta's sockets exist locally
  private matchSockets(extRecord: DeltaDtoRecord): boolean {
    const internalIndex = this.incomingDeltaRecord.findIndex((intRecord: any) => intRecord.socketId === extRecord.socketId);
    if (internalIndex === -1) { // incoming delta contains sockets that do not exist locally
      console.log('missing socket', extRecord.socketId);
      return false;
    } else {
      return this.matchDeltas(extRecord.deltaId, this.incomingDeltaRecord[internalIndex].deltas);
    }
  }

  // verify that incoming delta's deltas exist locally
  private matchDeltas(lastExtDeltaId: number, intRecordDeltas: any): boolean {
    const lastIntDeltaId = intRecordDeltas[intRecordDeltas.length - 1].localId;
    if (lastExtDeltaId > lastIntDeltaId) { // incoming delta contains deltas that do not exist locally
      console.log('!Reconcile -> missing deltas');
      return false;
    }
    return true;
  }

  /**
   * PROCESS INCOMING DELTA
   */

  // main handler function for processing delta
  public processDelta(delta: DeltaDto): DeltaDto | null {
    if (this.isDuplicateDelta(delta)) {
      return null;
    }
    const reconciled = this.identifyDiscrepancies(delta);
    if (reconciled.precedenceAdj) {
      console.log('record reconciled delta instead');
      this.recordIncomingDeltas(reconciled);
    } else {
      this.recordIncomingDeltas(delta);
    }
    return reconciled;
  }

  private isDuplicateDelta(delta: DeltaDto): boolean {
    const intRecord = this.incomingDeltaRecord.find((socket_i: DeltaRecord) => socket_i.socketId === delta.socketId);
    if (intRecord && intRecord.deltas.length > 0) {
      if (delta.localId <= intRecord.deltas[intRecord.deltas.length - 1].localId) {
        console.log('DISCARD -> duplicate delta', delta);
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
    let diffDeltas: DeltaDto[] = [];
    for (const socketRecord of this.incomingDeltaRecord) {
      if (socketRecord.socketId !== delta.socketId) { // do not check the socket that originated this delta
        const disc = this.buildExtDiscrepancies(delta, socketRecord);
        diffDeltas = diffDeltas.concat(disc);
      }
    }
    return diffDeltas;
  }

  private buildExtDiscrepancies(delta: DeltaDto, socketRecord: DeltaRecord): DeltaDto[] {
    let diffDeltas: DeltaDto[] = [];
    const incomingSocketRecord = delta.localRecord.find((record: DeltaDtoRecord) => record.socketId === socketRecord.socketId);
    if (!incomingSocketRecord) { // no record for socket in incoming delta; all discrepant
      for (const eachDelta of socketRecord.deltas) {
        diffDeltas.push(eachDelta);
      };
    } else { // record exists in incoming delta -> check for discrepancies
      const slice = this.sliceDeltas(incomingSocketRecord, socketRecord);
      diffDeltas = diffDeltas.concat(slice);
    }
    return diffDeltas;
  }

  private sliceDeltas(incomingSocketRecord: DeltaDtoRecord, socketRecord: DeltaRecord) {
    const diffDeltas: DeltaDto[] = [];
    const lastExtDeltaId = incomingSocketRecord.deltaId;
    const lastIntDeltaId = socketRecord.deltas[socketRecord.deltas.length-1].localId;
    if (lastIntDeltaId > lastExtDeltaId) {
      const sliceIndex = socketRecord.deltas.findIndex((deltaRecord: DeltaDto) => deltaRecord.localId === lastExtDeltaId);
      const slice = socketRecord.deltas.slice(sliceIndex + 1);
      for (const each of slice) {
        diffDeltas.push(each);
      }
    }
    return diffDeltas;
  }

  // checks for discrepancies with this socket
  private checkIntDiscrepancies(delta: DeltaDto, diffDeltas: any[]) {
    console.log('outgoingRecord', this.outgoingDeltaRecord);
    let lastDeltaForThisSocket = delta.localRecord.find((socket_i) => socket_i.socketId === this.socketIdMod);
    console.log('lastDeltaForThisSocket', lastDeltaForThisSocket);
    console.log('localDeltaTracker', this.localDeltaTracker);
    if (!lastDeltaForThisSocket && this.localDeltaTracker > 0) {
      for (const eachDelta of this.outgoingDeltaRecord) {
        diffDeltas.push(eachDelta);
      }
    } else if (lastDeltaForThisSocket && lastDeltaForThisSocket.deltaId < this.localDeltaTracker) { //HERE?
      let adj = 0;
      if (this.outgoingDeltaRecord.length > 0 && this.outgoingDeltaRecord[0].localId > 0) { // adjusts for missing outgoing deltas after reconnect event
        adj = this.outgoingDeltaRecord[0].localId;
      }
      const diff = this.outgoingDeltaRecord.slice(lastDeltaForThisSocket.deltaId - adj + 1); // OR HERE?
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

  // reconcile an incoming delta
  private reconciler(delta: DeltaDto, diffDeltas: DeltaDto[]): DeltaDto {
    let netIndexChange = 0;
    let incomingIndex = this.getIncomingIndex(delta);
    console.log({'diffDeltas': diffDeltas, 'incomingIndex': incomingIndex});
    for (const delta_i of diffDeltas) { // for each discrepant delta
      if (delta_i.ops[0].retain < incomingIndex) { // if local change occurred at i before incoming delta
        console.log('standard reconcile', delta_i);
        netIndexChange = netIndexChange + this.netOpChange(delta_i.ops);
      } else if (delta_i.ops[0].retain === incomingIndex) { // if changes occurred at same i
        console.log('equal i reconcile', delta_i);
        const precedence = delta.socketId.localeCompare(delta_i.socketId);
        if (precedence === -1) {
          // INdelta gets precedence over DIFFdelta; revise DIFFdelta index position accordingly
          let netChangeDiffDelta = 0;
          netChangeDiffDelta = netChangeDiffDelta + this.netOpChange(delta.ops);
          // delta_i.ops[0].retain = delta_i.ops[0].retain + netChangeDiffDelta;
          this.reviseDeltaRecord(delta_i, netChangeDiffDelta);
          console.log('INdelta precedence', {'netChangeDiffDelta': netChangeDiffDelta});
        } else if (precedence === 1) {
          // DIFFdelta gets precedence over the INdelta; track netchanges in INdelta position
          let netChangeDeltaIndex = 0;
          netChangeDeltaIndex = netChangeDeltaIndex + this.netOpChange(delta_i.ops);
          delta.ops[0].retain = delta.ops[0].retain + netChangeDeltaIndex;
          delta.precedenceAdj = true;
          incomingIndex = incomingIndex + netChangeDeltaIndex;
          console.log('DIFFdelta precedence', {'netChangeDeltaIndex': netChangeDeltaIndex});
        } else {
          console.log('socket IDs identical');
        }
      }
    };
    console.log('netIndexChange', netIndexChange);
    if (delta.ops[0].retain) {
      delta.ops[0].retain = delta.ops[0].retain + netIndexChange;
    }
    return delta;
  }

  // revises a local delta record due to precedence adjustments
  private reviseDeltaRecord(deltaDto: DeltaDto, netChange: number) {
    console.log('revising delta record')
    if (deltaDto.socketId !== this.socketIdMod) {
      const recordIndex = this.incomingDeltaRecord.findIndex((record: DeltaRecord) => record.socketId === deltaDto.socketId);
      if (recordIndex === -1) {
        console.log('could not find record');
      } else {
        const deltaIndex = this.incomingDeltaRecord[recordIndex].deltas.findIndex((delta: DeltaDto) => delta.localId === deltaDto.localId);
        if (deltaIndex === -1) {
          console.log('could not find delta');
        } else {
          this.incomingDeltaRecord[recordIndex].deltas[deltaIndex].ops[0].retain = this.incomingDeltaRecord[recordIndex].deltas[deltaIndex].ops[0].retain + netChange;
        }
      }
    } else {
      this.outgoingDeltaRecord[deltaDto.localId].ops[0].retain = this.outgoingDeltaRecord[deltaDto.localId].ops[0].retain + netChange;
    }

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

  // calculates net change in index due to ops array
  private netOpChange(deltaOps: any[]): number {
    let netChange = 0;
    for (const op of deltaOps) {
      if (op.insert) {
        netChange = netChange + op.insert.length;
      }
      if (op.delete) {
        netChange = netChange - op.delete;
      }
    };
    console.log('netChange', netChange);
    return netChange;
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
      socketId: this.socketIdMod,
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
      socketId: this.socketIdMod,
      localRecord: []
    };
    this.outgoingDeltaRecord.push(newDelta);
    this.localDeltaTracker++;
  }

  /**
   * PURGE DELTA RECORDS
   */

  public activatePurging() {
    console.log('activating purging');
    this.purgeInterval = setInterval(() => this.buildPurgeList(), 60000);
  }

  public stopPurging() {
    console.log('stopping purging');
    clearInterval(this.purgeInterval);
  }

  private buildPurgeList() {
    let purgeRecord: PurgeRecord[] = [];
    for (const socketRecord of this.incomingDeltaRecord) {
      const lastDelta: DeltaDto = socketRecord.deltas[socketRecord.deltas.length - 1];
      for (const stateRecord of lastDelta.localRecord) {
        if (stateRecord.socketId !== this.socketIdMod) { // skip purging for context socket
          const purgeIndex = purgeRecord.findIndex((record: PurgeRecord) => record.socketId === stateRecord.socketId);
          const localRecordIndex = this.incomingDeltaRecord.findIndex((record_i: DeltaRecord) => record_i.socketId === stateRecord.socketId);
          if (localRecordIndex !== -1) { // confirm record exists locally for this socket
            const lastDeltaRecord = this.incomingDeltaRecord[localRecordIndex].deltas[this.incomingDeltaRecord[localRecordIndex].deltas.length - 1];
            if (purgeIndex === -1) { // no purge record exists yet for this socket
              purgeRecord.push(this.buildPurgeRecord(stateRecord, lastDeltaRecord));
            } else { // update the purge record
              if (stateRecord.deltaId <= purgeRecord[purgeIndex].deltaId) {
                purgeRecord[purgeIndex].deltaId = stateRecord.deltaId;
              }
              purgeRecord[purgeIndex].count++;
            }
          }
        }
      };
    };
    console.log('purgeRecord post build', purgeRecord);
    this.purgeDeltas(purgeRecord);
  }

  // builds a new purge record
  private buildPurgeRecord(stateRecord: DeltaDtoRecord, lastDeltaRecord: DeltaDto): PurgeRecord {
    return {
      socketId: stateRecord.socketId,
      deltaId: stateRecord.deltaId <= lastDeltaRecord.localId ? stateRecord.deltaId : 0,
      count: 1
    };
  }

  private purgeDeltas(purgeList: PurgeRecord[]) {
    for (const purgeRecord of purgeList) {
      const sockets = this.incomingDeltaRecord.length;
      if (purgeRecord.count === sockets - 1) {
        const localIndex = this.incomingDeltaRecord.findIndex((record: DeltaRecord) => record.socketId === purgeRecord.socketId);
        if (localIndex !== -1) {
          const firstDelta = this.incomingDeltaRecord[localIndex].deltas[0];
          if (firstDelta && firstDelta.localId < purgeRecord.deltaId) {
            const deltaIndex = this.incomingDeltaRecord[localIndex].deltas.findIndex((delta_i: DeltaDto) => delta_i.localId === purgeRecord.deltaId);
            if (deltaIndex !== -1) {
              console.log('slicing', deltaIndex);
              this.incomingDeltaRecord[localIndex].deltas.splice(0, deltaIndex);
            }
          }
        }
      }
    };
    console.log('incomingIndex post', this.incomingDeltaRecord);
  }

  /**
   * RECONNECTIONS
   */

  // sets the local state after a reconnection event using info from another active user
  public setIncomingRecord(activeDoc: any) {
    this.incomingDeltaRecord = [];
    for (let record of activeDoc.incomingRecord) {
      if (record.socketId !== this.socketIdMod) {
        this.incomingDeltaRecord.push(record);
      }
    };
    if (activeDoc.outgoingRecord.length > 0) {
      this.incomingDeltaRecord.push({
        socketId: activeDoc.fromSocketId,
        deltas: activeDoc.outgoingRecord
      });
    }
  }

  /**
   * GENERAL HELPERS
   */

  public resetAllDeltas(): void {
    console.log('in reset all deltas');
    this.outgoingDeltaRecord = [];
    this.incomingDeltaRecord = [];
    this.localDeltaTracker = 0;
    this.setSocketIdMod();
  }

  // retrieves a socket record from local state
  private getIntSocketRecord(socketId: string): DeltaRecord | undefined {
    return this.incomingDeltaRecord.find((socket_i: DeltaRecord) => {
      return socket_i.socketId === socketId;
    });
  }

  public getIncomingRecord() {
    console.log('getIncomingRecord', this.incomingDeltaRecord);
    return this.incomingDeltaRecord;
  }

  public getOutgoingRecord() {
    console.log('getOutgoingRecord', this.outgoingDeltaRecord);
    return this.outgoingDeltaRecord;
  }

}
