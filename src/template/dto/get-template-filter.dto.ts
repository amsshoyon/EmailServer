import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetTemplateFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;
}
