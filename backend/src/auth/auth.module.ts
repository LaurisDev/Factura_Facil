// aca declaramos que usa Auth(ejm UserModule) y expone (controller, providers)
// sirve para organizar la app y controlar dependencias

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  //le dice a Nest“Auth necesita lo que exporta Users”, -> UsersService.
  imports: [UsersModule, PassportModule, JwtModule.register({
    global: true,
    secret: 'mi_clave_super_secreta_123',
    signOptions: { expiresIn: '2h' }
  })],                
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
