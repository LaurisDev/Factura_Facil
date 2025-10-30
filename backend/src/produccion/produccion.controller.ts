import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProduccionService } from './produccion.service';
import { CreateProduccionDto } from './dto/create-produccion.dto';
import { UpdateProduccionDto } from './dto/update-produccion.dto';

@Controller('produccion')
export class ProduccionController {
  constructor(private readonly produccionService: ProduccionService) {}

  @Post()
  create(@Body() createProduccionDto: CreateProduccionDto) {
    return this.produccionService.create(createProduccionDto);
  }

  @Get()
  findAll() {
    return this.produccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produccionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProduccionDto: UpdateProduccionDto) {
    return this.produccionService.update(+id, updateProduccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produccionService.remove(+id);
  }
}
