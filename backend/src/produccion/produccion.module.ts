import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduccionService } from './produccion.service';
import { ProduccionController } from './produccion.controller';
import { Produccion } from './entities/produccion.entity';

@Module({
  imports: [
    // ✅ Registra la entidad Produccion en TypeORM
    TypeOrmModule.forFeature([Produccion]),
  ],
  controllers: [
    // ✅ Controlador que maneja las rutas /produccion
    ProduccionController,
  ],
  providers: [
    // ✅ Servicio que contiene la lógica de negocio
    ProduccionService,
  ],
  exports: [
    // ✅ Permite usar ProduccionService en otros módulos (si lo necesitas luego)
    ProduccionService,
  ],
})
export class ProduccionModule {}
