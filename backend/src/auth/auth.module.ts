// aca declaramos que usa Auth(ejm UserModule) y expone (controller, providers)
// sirve para organizar la app y controlar dependencias

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  //le dice a Nest“Auth necesita lo que exporta Users”, -> UsersService.
  imports: [UsersModule],                
  controllers: [AuthController]
})
export class AuthModule {}
