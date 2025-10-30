import { Controller, Post, Get, Body } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { Factura } from './entities/factura.entity';


@Controller('facturas')
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) {}

  @Post()
  async crearFactura(@Body() data: Partial<Factura>) {
    return this.facturasService.crearFactura(data);
  }

  @Get()
  async obtenerFacturas() {
    return this.facturasService.obtenerFacturas();
  }
}
