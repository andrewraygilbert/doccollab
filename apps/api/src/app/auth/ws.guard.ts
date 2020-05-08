import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsAuth } from './ws.auth';

@Injectable()
export class WsGuard implements CanActivate {

  constructor(
    private wsAuth: WsAuth,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();
    const token = client.handshake.query.token;
    const payload = this.wsAuth.validate(token);
    if (payload) {
      return true;
    }
    return false;
  }
}
