//logica -> fijamos y calculamos totales

import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,ILike } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { PRODUCT_PRICE } from './constants';
import type { Response } from 'express';
import PDFDocument from 'pdfkit';

@Injectable()
export class FacturasService {
  constructor(
    @InjectRepository(Factura)
    private readonly repo: Repository<Factura>,
  ) {}

  async create(dto: CreateFacturaDto) {
    // Precio unitario 
    const unit = PRODUCT_PRICE[dto.producto];
    if (unit === undefined) {
      throw new BadRequestException('Producto no válido');
    }

    // Total
    const total = unit * dto.cantidad;

    // Armar y guardar
    const factura = this.repo.create({
      ...dto,
      unitPrice: unit.toFixed(2),   //esto de toFixed es para redondear a 2 decimales que nos sirve para los precios y lo vuelve string
      valorTotal: total.toFixed(2),
    });

    return this.repo.save(factura); //guarda en BD
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
    // 🔹 Buscar por número o cliente (LIKE insensible a mayúsculas)
  async buscar(query: string) {
    if (!query || query.trim() === '') return [];
    return this.repo.find({
      where: [
        { numero: ILike(`%${query}%`) },
        { cliente: ILike(`%${query}%`) },
      ],
      order: { fechaCreacion: 'DESC' },
    });
  }

  // 🔹 Descargar factura como PDF
  async descargarPDF(id: string, res: Response) {
    const factura = await this.repo.findOneBy({ id });
    if (!factura) {
      throw new NotFoundException('Factura no encontrada');
    }

    // Crear documento PDF
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=factura-${factura.numero}.pdf`);
    doc.pipe(res);

    // Encabezado
    doc.fontSize(18).text('Factura', { align: 'center' });
    doc.moveDown();

    // Datos de la factura
    doc.fontSize(12).text(`Número: ${factura.numero}`);
    doc.text(`Cliente: ${factura.cliente}`);
    doc.text(`Contacto: ${factura.contacto}`);
    doc.text(`Fecha: ${factura.fechaCreacion}`);
    doc.text(`Forma de pago: ${factura.formaPago}`);
    doc.moveDown();

    // Detalles del producto
    doc.text(`Producto: ${factura.producto}`);
    doc.text(`Descripción: ${factura.descripcion}`);
    doc.text(`Cantidad: ${factura.cantidad}`);
    doc.text(`Precio unitario: $${factura.unitPrice}`);
    doc.text(`Valor total: $${factura.valorTotal}`);
    doc.moveDown();

    // Pie
    doc.text('Gracias por su compra.', { align: 'center' });

    doc.end();
  }

  async findOne(id: string) {
    const factura = await this.repo.findOne({ where: { id } });
    if (!factura) throw new NotFoundException('Factura no encontrada');
    return factura;
  }
}
