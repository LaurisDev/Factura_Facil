import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,} from 'typeorm';
import { TipoFactura, Producto, FormaPago } from '../constants';

@Entity({ name: 'facturas' })
export class Factura {
  @PrimaryGeneratedColumn('uuid') // este 'uuid' es por postgres que neesita uuidExtension: 'pgcrypto' en TypeORM
  id: string;

  //FV-1 o FV-2 -> esto lo tenemos en constants
  @Column({ type: 'varchar', length: 10 })
  tipo: TipoFactura;

  @Column({ type: 'varchar', length: 50 })
  numero: string;

  @Column({ type: 'varchar', length: 150 })
  cliente: string;

  @Column({ type: 'varchar', length: 50 })
  contacto: string;

  @Column({ type: 'date' })
  fechaCreacion: string; // formato YYYY-MM-DD

  // Producto (dos opciones)
  @Column({ type: 'varchar', length: 40 })
  producto: Producto;

  // texto libre opcional
  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'int' })
  cantidad: number;

  @Column('numeric', { precision: 10, scale: 2 })
  unitPrice: string;

  // Total calculado = cantidad * unitPrice (lo calcula el backend)
  @Column('numeric', { precision: 12, scale: 2 })
  valorTotal: string;

  // EFECTIVO / TRANSFERENCIA
  @Column({ type: 'varchar', length: 20 })
  formaPago: FormaPago;

  // Timestamps automaticos(no confundir con fechaCreacion)
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}