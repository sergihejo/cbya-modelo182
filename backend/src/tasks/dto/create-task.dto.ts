import { 
    IsString,
    IsNotEmpty
 } from 'class-validator';
export class CreateTaskDto {
    id: number;

    @IsString()
    name: string;

    @IsString()
    description: string;

    status: boolean;
}