import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import type { Response } from 'express';

@Controller('facturas')
export class FacturasController {
  constructor(private readonly service: FacturasService) {}

  // Crear una factura
  @Post()
  create(@Body() dto: CreateFacturaDto) {
    return this.service.create(dto);
  }

  // Listar todas
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // 🔹 Buscar por número o cliente — debe ir **antes de :id**
  @Get('buscar')
  buscar(@Query('query') query: string) {
    return this.service.buscar(query);
  }

  // 🔹 Descargar factura PDF
  @Get('descargar/:id')
  descargar(@Param('id') id: string, @Res() res: Response) {
    return this.service.descargarPDF(id, res);
  }

  // Obtener una sola factura por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
