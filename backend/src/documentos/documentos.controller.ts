import { Controller, Get, Post, Body, Param, Delete, Query, Put, Res,} from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import type { Response } from 'express';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Post()
  create(@Body() dto: CreateDocumentoDto) {
    return this.documentosService.create(dto);
  }

  @Get()
  findAll() {
    return this.documentosService.findAll();
  }

  @Get('buscar')
  buscar(@Query('query') query: string) {
    return this.documentosService.buscar(query);
  }


  @Get('descargar/:id')
  descargar(@Param('id') id: string, @Res() res: Response) {
    return this.documentosService.descargarPDF(id, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDocumentoDto) {
    return this.documentosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentosService.remove(id);
  }
}
