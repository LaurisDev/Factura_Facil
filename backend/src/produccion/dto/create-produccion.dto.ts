import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateProduccionDto {
  @IsDateString({}, { message: 'La fecha debe tener formato válido (YYYY-MM-DD)' })
  fecha: string;

  @IsString()
  @IsNotEmpty({ message: 'El producto es obligatorio' })
  producto: string;

  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  cantidad: number;

  @IsString()
  @IsNotEmpty({ message: 'La unidad es obligatoria' })
  unidad: string;

  @IsOptional()
  @IsArray({ message: 'Las observaciones deben ser un arreglo de textos' })
  @IsString({ each: true, message: 'Cada observación debe ser texto' })
  observaciones?: string[];
}
