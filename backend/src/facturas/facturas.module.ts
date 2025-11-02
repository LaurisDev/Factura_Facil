// Modulo= agrupa entidad + repo + controller + service para inyección de dependencias

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { FacturasService } from './facturas.service';
import { FacturasController } from './facturas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Factura])], // habilita el repo de factura
  controllers: [FacturasController],
  providers: [FacturasService],
  exports: [FacturasService],
})
export class FacturasModule {}
