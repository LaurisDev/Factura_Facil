import {
  IsString,
  IsDateString,
  Length,
  IsOptional,
  IsEnum,
  IsInt,
  Min
} from 'class-validator';
import { TipoDocumento, EstadoDocumento } from '../constans';

export class CreateDocumentoDto {
  @IsEnum(TipoDocumento)
  tipo: TipoDocumento;

  @IsString()
  @Length(1, 50)
  numero: string;

  @IsString()
  @Length(1, 150)
  cliente: string;

  @IsString()
  @Length(1, 100)
  contacto: string;

  @IsDateString()
  fechaCreacion: string;

  @IsInt()
  @Min(0)
  valorTotal: number;

  @IsEnum(EstadoDocumento)
  estado: EstadoDocumento;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
