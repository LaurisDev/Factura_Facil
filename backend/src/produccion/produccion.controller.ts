import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ProduccionService } from './produccion.service';
import { CreateProduccionDto } from './dto/create-produccion.dto';
import { UpdateProduccionDto } from './dto/update-produccion.dto';
import { Produccion } from './entities/produccion.entity';

@Controller('produccion')
export class ProduccionController {
  constructor(private readonly produccionService: ProduccionService) {}

  /**
   * Crear una nueva producción
   * POST /produccion
   */
  @Post()
  create(@Body() dto: CreateProduccionDto): Promise<Produccion> {
    return this.produccionService.create(dto);
  }

  /**
   * Listar producciones (con filtros opcionales)
   * GET /produccion?search=panela&limit=10&offset=0
   */
  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<Produccion[]> {
    return this.produccionService.findAll({ search, limit, offset });
  }

  /**
   * Obtener una producción específica por ID
   * GET /produccion/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Produccion> {
    return this.produccionService.findOne(id);
  }

  /**
   * Actualizar una producción
   * PUT /produccion/:id
   */
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProduccionDto,
  ): Promise<Produccion> {
    return this.produccionService.update(id, dto);
  }

  /**
   * Eliminar una producción
   * DELETE /produccion/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.produccionService.remove(id);
  }
}
