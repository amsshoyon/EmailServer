import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetServiceFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;
}
