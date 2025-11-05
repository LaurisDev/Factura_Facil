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

  // === Descargar factura PDF con estilo mejorado ===
  async descargarPDF(id: string, res: Response) {
    const factura = await this.repo.findOneBy({ id });
    if (!factura) throw new NotFoundException('Factura no encontrada');

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=factura-${factura.numero}.pdf`,
    );
    doc.pipe(res);

    // === Título ===
    doc
      .fontSize(22)
      .fillColor('#3e2723') // tono café oscuro para título
      .text('FACTURA', { align: 'right' })
      .moveDown(0.3);
    doc
      .fontSize(10)
      .fillColor('#795548')
      .text('FacturaFácil', { align: 'right' })
      .moveDown(1);

    // === Bloque de cabecera (café claro) ===
    const headerColor = '#d7ccc8'; // café claro
    doc.rect(50, 115, 500, 80).fill(headerColor).stroke();
    doc.fillColor('#000').fontSize(11);

    doc.font('Helvetica-Bold').text('FACTURA PARA:', 60, 130);
    doc.font('Helvetica').text(`${factura.cliente}`, 60, 145);
    doc.text(`${factura.contacto}`, 60, 160);
    doc.text(`Fecha: ${factura.fechaCreacion}`, 60, 175);

    doc.font('Helvetica-Bold').text('DETALLES FACTURA:', 320, 130);
    doc.font('Helvetica').text(`Número: ${factura.numero}`, 320, 145);
    doc.text(`Forma de pago: ${factura.formaPago}`, 320, 160);

    // === Detalle de productos ===
    doc.moveDown(3);
    doc.font('Helvetica-Bold').text('DETALLE DE PRODUCTOS', 50, 210);
    doc.moveTo(50, 225).lineTo(550, 225).stroke();

    const tableTop = 240;
    const col1 = 50;
    const col2 = 300;
    const col3 = 370;
    const col4 = 460;

    doc.fontSize(11).font('Helvetica-Bold');
    doc.text('DESCRIPCIÓN', col1, tableTop);
    doc.text('CANT.', col2, tableTop);
    doc.text('PRECIO U.', col3, tableTop);
    doc.text('TOTAL', col4, tableTop);
    doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

    // === Producto ===
    doc.font('Helvetica').fontSize(11);
    const y = tableTop + 30;
    doc.text(factura.producto, col1, y);
    doc.text(factura.cantidad.toString(), col2, y);
    doc.text(`$${factura.unitPrice}`, col3, y);
    doc.text(`$${factura.valorTotal}`, col4, y);

    // === Totales ===
    const subtotal = parseFloat(factura.valorTotal);
    const impuesto = subtotal * 0.1;
    const total = subtotal + impuesto;

    doc.moveDown(4);
    doc.font('Helvetica-Bold');
    doc.text(`Subtotal:`, 400, y + 60);
    doc.text(`Impuesto (10%):`, 400, y + 75);
    doc.text(`TOTAL:`, 400, y + 95);
    doc.font('Helvetica');
    doc.text(`$${subtotal.toFixed(2)}`, 500, y + 60);
    doc.text(`$${impuesto.toFixed(2)}`, 500, y + 75);
    doc.font('Helvetica-Bold').text(`$${total.toFixed(2)}`, 500, y + 95);

    const bottomLineY = 750;
    doc
      .moveTo(50, bottomLineY)
      .lineTo(550, bottomLineY)
      .strokeColor('#6F4E37') // café oscuro elegante
      .stroke();

    // === Mensaje final en la línea roja ===
    doc.fontSize(10).fillColor('#5d4037'); // café medio
    doc.text('Gracias por su compra.', 0, bottomLineY - 20, { align: 'center' });
    doc.text('Factura generada automáticamente por FacturaFácil', 0, bottomLineY - 7, {
      align: 'center',
    });

    doc.end();
  }



  async findOne(id: string) {
    const factura = await this.repo.findOne({ where: { id } });
    if (!factura) throw new NotFoundException('Factura no encontrada');
    return factura;
  }
}
