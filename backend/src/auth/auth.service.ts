import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
constructor(
    private usersService: UsersService,
    private jwtService: JwtService,

){}

// Verifica si el usuario existe y su contraseña es valida
async validateUser(email: string, password: string){
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Email no encontrado');

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta')
    
        // Excluimos el hash para no devolverlo
    const {
        passwordHash, ...result } = user;
        return result;
}

// Generamos un token JWT
    async login(user: any){
        const payload = {
            sub: user.id, email: user.email
        }
        return{
            access_token: this.jwtService.sign(payload),
            user,
        }
    }
}