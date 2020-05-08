import { Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { User } from '@doccollab/api-interfaces';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { WsAuth } from './ws.auth';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private wsAuthService: WsAuth
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === pass) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async retrieveUser(socket: Socket): Promise<any> {
    const payload = await this.wsAuthService.validate(socket.handshake.query.token);
    return this.usersService.findUserById(payload.sub);
  }

}
