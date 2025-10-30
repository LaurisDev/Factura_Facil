import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturasController } from './facturas.controller';
import { FacturasService } from './facturas.service';
import { Factura } from './entities/factura.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Factura])],
  controllers: [FacturasController],
  providers: [FacturasService],
})
export class FacturasModule {}
