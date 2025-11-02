import {IsEnum,IsInt,IsOptional,IsString,Min,IsDateString,Length,} from 'class-validator';
import { TipoFactura, Producto, FormaPago } from '../constants';
export class CreateFacturaDto {

  @IsEnum(TipoFactura)
  tipo: TipoFactura;

  @IsString()
  @Length(1, 50)
  numero: string;

  @IsString()
  @Length(1, 150)
  cliente: string;

  @IsString()
  @Length(1, 50)
  contacto: string;

  @IsDateString()
  fechaCreacion: string;

  @IsEnum(Producto)
  producto: Producto;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsInt()
  @Min(1)
  cantidad: number;

  @IsEnum(FormaPago)
  formaPago: FormaPago;
}
