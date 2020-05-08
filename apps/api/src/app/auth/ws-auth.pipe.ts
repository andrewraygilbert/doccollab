import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class WsAuthPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {
    console.log('inpipe', value);
    return value;
  }

}
