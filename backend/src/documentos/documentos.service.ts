import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Documento } from './entities/documento.entity';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { Factura } from '../facturas/entities/factura.entity';
import { Response } from 'express';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(Documento)
    private documentosRepository: Repository<Documento>,

    @InjectRepository(Factura)
    private facturasRepository: Repository<Factura>,
  ) {}

  async create(dto: CreateDocumentoDto): Promise<Documento> {
    const doc = this.documentosRepository.create(dto);
    return await this.documentosRepository.save(doc);
  }

  async findAll(): Promise<Documento[]> {
    return await this.documentosRepository.find();
  }

  // ✅ Buscar documentos (en realidad facturas)
  async buscar(query: string) {
    if (!query) return [];

    return await this.facturasRepository.find({
      where: [
        { numero: Like(`%${query}%`) },
        { cliente: Like(`%${query}%`) },
      ],
    });
  }

  async findOne(id: string): Promise<Documento> {
    const doc = await this.documentosRepository.findOne({ where: { id } });
    if (!doc) throw new NotFoundException('Documento no encontrado');
    return doc;
  }

  async update(id: string, dto: UpdateDocumentoDto): Promise<Documento> {
    await this.documentosRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.documentosRepository.delete(id);
  }

  // --- Descargar como PDF ---
  async descargarPDF(id: string, res: Response) {
    const factura = await this.facturasRepository.findOne({ where: { id } });
    if (!factura) throw new NotFoundException('Factura no encontrada');

    const pdf = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=factura-${factura.numero}.pdf`);

    pdf.text(`Factura: ${factura.numero}`);
    pdf.text(`Cliente: ${factura.cliente}`);
    pdf.text(`Contacto: ${factura.contacto}`);
    pdf.text(`Fecha: ${factura.fechaCreacion}`);
    pdf.text(`Producto: ${factura.producto}`);
    pdf.text(`Cantidad: ${factura.cantidad}`);
    pdf.text(`Valor total: $${factura.valorTotal}`);
    pdf.text(`Forma de pago: ${factura.formaPago}`);
    pdf.text(`Descripción: ${factura.descripcion ?? 'N/A'}`);

    pdf.pipe(res);
    pdf.end();
  }
}
