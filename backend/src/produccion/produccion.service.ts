import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProduccionDto } from './dto/create-produccion.dto';
import { UpdateProduccionDto } from './dto/update-produccion.dto';
import { Produccion } from './entities/produccion.entity';

@Injectable()
export class ProduccionService {
  constructor(
    @InjectRepository(Produccion)
    private readonly repo: Repository<Produccion>,
  ) {}

  /**
   * Crear una nueva producción
   */
  async create(dto: CreateProduccionDto): Promise<Produccion> {
    const produccion = this.repo.create({
      ...dto,
      observaciones: dto.observaciones || [],
    });

    return await this.repo.save(produccion);
  }

  /**
   * Obtener todas las producciones (con filtros opcionales)
   */
  async findAll(query?: { search?: string; limit?: number; offset?: number }): Promise<Produccion[]> {
    const qb = this.repo.createQueryBuilder('p').orderBy('p.fecha', 'DESC');

    if (query?.search) {
      qb.andWhere('(p.producto ILIKE :q OR p.unidad ILIKE :q)', {
        q: `%${query.search}%`,
      });
    }

    if (query?.limit) qb.take(query.limit);
    if (query?.offset) qb.skip(query.offset);

    return await qb.getMany();
  }

  /**
   * Buscar una producción por ID
   */
  async findOne(id: string): Promise<Produccion> {
    const produccion = await this.repo.findOne({ where: { id } });

    if (!produccion) {
      throw new NotFoundException('Producción no encontrada');
    }

    return produccion;
  }

  /**
   * Actualizar una producción existente
   */
  async update(id: string, dto: UpdateProduccionDto): Promise<Produccion> {
    const produccion = await this.findOne(id);
    Object.assign(produccion, dto);
    return await this.repo.save(produccion);
  }

  /**
   * Eliminar una producción
   */
  async remove(id: string): Promise<void> {
    const produccion = await this.findOne(id);
    await this.repo.remove(produccion);
  }
}
