import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('produccion')
export class Produccion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fecha: string;

  @Column()
  producto: string;

  @Column('float')
  cantidad: number;

  @Column()
  unidad: string;

  @Column('simple-array', { nullable: true })
  observaciones: string[];
  
}
