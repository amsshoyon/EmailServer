import { IsNotEmpty } from 'class-validator';

export class CreateTemplateDto {
    @IsNotEmpty() title: string;
    templateName: string;
    data: string;
    attachment: string;
    serviceId: number;
}
