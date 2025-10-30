import { Injectable } from '@nestjs/common';
import { CreateProduccionDto } from './dto/create-produccion.dto';
import { UpdateProduccionDto } from './dto/update-produccion.dto';

@Injectable()
export class ProduccionService {
  create(createProduccionDto: CreateProduccionDto) {
    return 'This action adds a new produccion';
  }

  findAll() {
    return `This action returns all produccion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produccion`;
  }

  update(id: number, updateProduccionDto: UpdateProduccionDto) {
    return `This action updates a #${id} produccion`;
  }

  remove(id: number) {
    return `This action removes a #${id} produccion`;
  }
}
