import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  register(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }
}
