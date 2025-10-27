// controlador HTTP, define rutas(endpoints) y que hacer cuando llega una peticion

import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private users: UsersService, private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    // Creamos el usuario
    const created: User = await this.users.create(dto);

  }
  @Post('login')
  async login(@Body() dto: LoginDto){
    const user = await this.authService.validateUser(dto.email, dto.password)
    return this.authService.login(user)
  }
}
