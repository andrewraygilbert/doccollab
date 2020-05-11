import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class WsAuth {

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validate(token: string) {
    return this.jwtService.verify(token, {ignoreExpiration: true});
  }

  async getUser(token: string) {
    const payload = await this.jwtService.verify(token, { ignoreExpiration: true });
    return this.usersService.userModelById(payload.sub);
  }

}
