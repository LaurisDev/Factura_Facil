//logica -> fijamos y calculamos totales

import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { PRODUCT_PRICE } from './constants';

@Injectable()
export class FacturasService {
  constructor(
    @InjectRepository(Factura)
    private readonly repo: Repository<Factura>,
  ) {}

  async create(dto: CreateFacturaDto) {
    // Precio unitario 
    const unit = PRODUCT_PRICE[dto.producto];
    if (unit === undefined) {
      throw new BadRequestException('Producto no válido');
    }

    // Total
    const total = unit * dto.cantidad;

    // Armar y guardar
    const factura = this.repo.create({
      ...dto,
      unitPrice: unit.toFixed(2),   //esto de toFixed es para redondear a 2 decimales que nos sirve para los precios y lo vuelve string
      valorTotal: total.toFixed(2),
    });

    return this.repo.save(factura); //guarda en BD
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const factura = await this.repo.findOne({ where: { id } });
    if (!factura) throw new NotFoundException('Factura no encontrada');
    return factura;
  }
}
