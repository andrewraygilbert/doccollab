import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { User, CreateUserDTO } from '@doccollab/api-interfaces';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService,
  ) {}

  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':_id')
  async findUserById(@Param('_id') _id: string): Promise<User> {
    return this.usersService.findUserById(_id);
  }

  @Post('register')
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.usersService.createUser(createUserDTO);
  }

}
