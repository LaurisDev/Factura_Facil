import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';


@Injectable()
export class FacturasService {
  constructor(
    @InjectRepository(Factura)
    private facturasRepository: Repository<Factura>,
  ) {}

  async crearFactura(data: Partial<Factura>): Promise<Factura> {
    const factura = this.facturasRepository.create(data);
    return this.facturasRepository.save(factura);
  }

  async obtenerFacturas(): Promise<Factura[]> {
    return this.facturasRepository.find();
  }
}
