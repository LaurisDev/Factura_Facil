import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';
import { Documento } from './entities/documento.entity';
import { Factura } from '../facturas/entities/factura.entity'; // 👈 IMPORTANTE

@Module({
  imports: [
    TypeOrmModule.forFeature([Documento, Factura]), // 👈 Agrega Factura aquí
  ],
  controllers: [DocumentosController],
  providers: [DocumentosService],
  exports: [DocumentosService],
})
export class DocumentosModule {}
