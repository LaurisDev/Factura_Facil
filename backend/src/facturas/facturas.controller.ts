// define rutas 
// solo RECIBE/RETORNA datos y llama al service- ACA NO SE CALCULA 

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { CreateFacturaDto } from './dto/create-factura.dto';

@Controller('facturas')
export class FacturasController {
  constructor(private readonly service: FacturasService) {}

  // POST crear una factura
  @Post()
  create(@Body() dto: CreateFacturaDto) {
    return this.service.create(dto);
  }

  //listar todas
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET traer una
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
