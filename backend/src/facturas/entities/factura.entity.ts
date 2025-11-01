import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Factura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: string;

  @Column()
  cliente: string;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column()
  descripcion: string;

  @Column({ type: 'text' })
  fechaCreacion: string;
}
