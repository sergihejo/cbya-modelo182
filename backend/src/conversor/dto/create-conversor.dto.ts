import {
  IsNotEmpty,
  IsString,
  Matches,
  IsNumber,
  Min,
  Max,
  ValidateNested,
  IsOptional,
} from 'class-validator';

export class CreateConversorDto {
  @IsNotEmpty()
  @Matches(/^[A-Z][0-9]{8}$/, {
    message: 'El CIF debe comenzar por una letra y tener 8 dígitos numéricos.',
  })
  cif: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{9}$/, { message: 'El teléfono debe tener 9 dígitos numéricos.' })
  tel: string;

  @IsNotEmpty()
  @Matches(/^[A-Z]+(\s[A-Z]+)*,(\s[A-Z]+)*$/, {
    message: 'El formato debe ser "APELLIDOS, NOMBRE".',
  })
  repr: string;

  @IsNotEmpty()
  @Matches(/^[A-Z]+(\s[A-Z]+)*,(\s[A-Z]+)*$/, {
    message: 'El formato debe ser "APELLIDOS, NOMBRE".',
  })
  poc: string;

  // Campos de deducción
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Este campo debe ser un número entre 0 y 100.' })
  @Max(100, { message: 'Este campo debe ser un número entre 0 y 100.' })
  ded_and: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Este campo debe ser un número entre 0 y 100.' })
  @Max(100, { message: 'Este campo debe ser un número entre 0 y 100.' })
  ded_canarias: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Este campo debe ser un número entre 0 y 100.' })
  @Max(100, { message: 'Este campo debe ser un número entre 0 y 100.' })
  ded_clm: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Este campo debe ser un número entre 0 y 100.' })
  @Max(100, { message: 'Este campo debe ser un número entre 0 y 100.' })
  ded_cat: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Este campo debe ser un número entre 0 y 100.' })
  @Max(100, { message: 'Este campo debe ser un número entre 0 y 100.' })
  ded_ext: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Este campo debe ser un número entre 0 y 100.' })
  @Max(100, { message: 'Este campo debe ser un número entre 0 y 100.' })
  ded_gal: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Este campo debe ser un número entre 0 y 100.' })
  @Max(100, { message: 'Este campo debe ser un número entre 0 y 100.' })
  ded_mad: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Este campo debe ser un número entre 0 y 100.' })
  @Max(100, { message: 'Este campo debe ser un número entre 0 y 100.' })
  ded_mur: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Este campo debe ser un número entre 0 y 100.' })
  @Max(100, { message: 'Este campo debe ser un número entre 0 y 100.' })
  ded_rioja: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Este campo debe ser un número entre 0 y 100.' })
  @Max(100, { message: 'Este campo debe ser un número entre 0 y 100.' })
  ded_val: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Este campo debe ser un número entre 0 y 100.' })
  @Max(100, { message: 'Este campo debe ser un número entre 0 y 100.' })
  ded_ar: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Este campo debe ser un número entre 0 y 100.' })
  @Max(100, { message: 'Este campo debe ser un número entre 0 y 100.' })
  ded_ast: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Este campo debe ser un número entre 0 y 100.' })
  @Max(100, { message: 'Este campo debe ser un número entre 0 y 100.' })
  ded_balears: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Este campo debe ser un número entre 0 y 100.' })
  @Max(100, { message: 'Este campo debe ser un número entre 0 y 100.' })
  ded_cant: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Este campo debe ser un número entre 0 y 100.' })
  @Max(100, { message: 'Este campo debe ser un número entre 0 y 100.' })
  ded_cyl: number;
}
