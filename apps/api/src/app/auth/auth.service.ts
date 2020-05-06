import { Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { User } from '@doccollab/api-interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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

}
