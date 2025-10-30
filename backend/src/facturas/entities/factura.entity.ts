import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  fechaCreacion: Date;
}
