import { IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
    @IsNotEmpty() title: string;
}
