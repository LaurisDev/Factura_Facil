import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TipoDocumento, EstadoDocumento } from '../constans';

@Entity('documentos')
export class Documento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TipoDocumento })
  tipo: TipoDocumento;

  @Column({ unique: true })
  numero: string;

  @Column()
  cliente: string;

  @Column()
  contacto: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  valorTotal: number;

  @Column({ type: 'enum', enum: EstadoDocumento })
  estado: EstadoDocumento;

  @Column({ nullable: true, type: 'text' })
  descripcion?: string;
}
