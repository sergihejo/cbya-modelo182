import { PartialType } from '@nestjs/mapped-types';
import { CreateConversorDto } from './create-conversor.dto';

export class UpdateConversorDto extends PartialType(CreateConversorDto) {}
