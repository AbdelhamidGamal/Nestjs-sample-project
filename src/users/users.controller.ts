import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createuser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    this.userService.create(email, password);
  }
}
