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

   /*
  // main handler function
  public async incomingDelta(delta: DeltaDto): Promise<DeltaDto> {
    // check to see if delta ready to reconcile
    this.recordIncomingDeltas(delta); // record the delta locally
    return this.compareDeltaStates(delta); // reconcile
  }
  */

  // can the incoming delta be reconciled?
  public canReconcileDelta(delta: DeltaDto): boolean {
    let loopIndex = 0;
    for (const extSocket of delta.localRecord) { // iterate over each socket in incoming delta's record
      const socketIndex = this.incomingDeltaRecord.findIndex((socket_i: any) => socket_i.socketId === extSocket.socketId);
      if (socketIndex === -1) { // the socket doesn't exist in local record; can't reconcile
        break;
      } else { // the socket exists in the local record; check deltas
        const lastDeltaIdSocket = extSocket.deltaId;
        const length = this.incomingDeltaRecord[socketIndex].deltas.length;
        const lastDeltaIdLocal = this.incomingDeltaRecord[socketIndex].deltas[length - 1].localId;
        if (lastDeltaIdSocket > lastDeltaIdLocal) { // incoming delta contains deltas that do not exist locally; can't reconcile
          break;
        } else { // all deltas in incoming delta exist locally; can reconcile for this external socket
          loopIndex++;
        }
      }
    };
    if (loopIndex === delta.localRecord.length - 1) { // every delta in incoming delta exists locally; CAN incoming delta
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

  private identifyDiscrepancies(delta: DeltaDto): DeltaDto {
    let diffDeltas = [];
    // iterate through each socket record to match deltas
    // iterate through local record to ID discrepancies
    for (const socket_i of this.incomingDeltaRecord) { // iterate over local records for each socket
      if (socket_i.socketId !== delta.socketId) { // do not ID discrepancies for socket that originated the incoming delta
        const extSocketRecord = delta.localRecord.find(extSocket_i => extSocket_i.socketId === socket_i.socketId); // grabs external record for this socket
        if (!extSocketRecord) {
          throw new Error('missing socket');
        }
        const lastExtDeltaId = extSocketRecord.deltaId; // get the last delta id for this socket
        const lastIntDeltaId = socket_i.deltas[socket_i.deltas.length-1].localId;
        if (lastIntDeltaId > lastExtDeltaId) { // if local state has changes that are not present in incoming delta, add to diff deltas array
          diffDeltas.push(socket_i.deltas.slice(lastExtDeltaId + 1));
        }
      }
    };
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
    if (diffDeltas.length > 0) { // if discrepancies, reconcile
      return this.reconciler(delta, diffDeltas);
    }
    return delta;
  }

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
    /*
    if (delta.ops[0].retain) {
      console.log('reassigning delta op 1 retain index');
      delta.ops[0].retain = delta.ops[0].retain + netIndexChange;
    }
    */
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






















  /* OLD ADD TO DELTA
  // add the incoming delta to the local record for deltas from external sockets
  private recordIncomingDeltas(delta: DeltaDto) {
    const index = this.getLastIncomingDelta(delta.socketId);
    // if no prior delta for socket in record, push delta into local record
    if (index === -1) {
      this.incomingDeltaRecord.push(delta);
    // if prior delta in record, then replace it with the new delta
    } else {
      this.incomingDeltaRecord.splice(index, 1, delta);
    }
  }
  */

  /*
  // compare incoming delta state to local state to identify discrepancies for reconciliation
  private identifyStateDiscrepancies(delta: DeltaDto) {
    // check to see if incoming delta knows of local changes
    for (const localSocket_i of this.incomingDeltaRecord) {
      const index = delta.localState.findIndex((extSocket_i: any) => extSocket_i.socketId === localSocket_i.socketId);
      // incoming delta does not have record for socket
      if (index === -1) {
        // need to reconcile for this socket
      // incoming delta does have record for socket
      } else {
        // get last delta id for this socket locally
        // compare to last delta id for this socket in incoming delta
        // if match, no reconciliation for this socket needed
        // if discrepancy, then reconcile deltas for this socket
        // remove this socket from local state of incoming socket, since it has been handled
      }
    };
    // check to see if local socket knows of all deltas in incoming delta
    if (delta.localState.length > 0) {
      // if localState has any elements left, then that means it was aware of sockets that the local socket was not aware of -> enqueue this delta until missing sockets/deltas arrive
    }
  }
  */

  /*
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
  */

  // get the last delta from this socket
  /*
  private getLastIncomingDelta(extSocketId: string) {
    return this.incomingDeltaRecord.findIndex((delta_i: DeltaDto) => delta_i.socketId === extSocketId );
  }
  */

  // gets the starting index of the incoming delta


  /*
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
  /*

  // gets the last delta from this socket that the external socket was aware of when it sent this delta
  /*
  private getLastDelta(delta: DeltaDto): DeltaDto | null {
    const lastDelta = delta.localState.find(delta_i => delta_i.socketId === this.socketId);
    if (!lastDelta) {
      return null;
    }
    return lastDelta;
  }
  */

  /**
   * OUTGOING DELTAS
   */



  // prepares and sends out a delta
  /*
  public outgoingDelta(delta: any) {
    this.addLocalDelta(delta);
    delta.socketId = this.socketId;
    delta.localId = this.localDeltaTracker;
    delta.localState = this.incomingDeltaRecord;
    this.localDeltaTracker++;
    return delta;
  }
  */

  /**
   * GENERAL HELPERS
   */

  public resetAllDeltas(): void {
    this.outgoingDeltaRecord = [];
    this.incomingDeltaRecord = [];
  }

}
