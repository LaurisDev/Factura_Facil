//logica para crear y buscar usuarios

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}


  async create(createUserDto: any): Promise<User> {

    //si el cliente intenta registrar un mismo email recibe 409
    const duplicado = await this.findOneByEmail(createUserDto.email);
    if (duplicado) throw new ConflictException('Email ya está registrado'); 

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    const newUser = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      passwordHash: hashedPassword,

    });
    return this.userRepository.save(newUser);
  }

  async findOneByEmail(email: string): Promise<User | null> 
  {
    return this.userRepository.findOneBy({ email });
  }
}
