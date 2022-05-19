import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetProjectFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;
}
