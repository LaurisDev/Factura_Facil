// controlador HTTP, define rutas(endpoints) y que hacer cuando llega una peticion

import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private users: UsersService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    // Creamos el usuario
    const created: User = await this.users.create(dto);

  }
}
