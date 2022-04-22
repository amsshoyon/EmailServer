import { IsNotEmpty } from 'class-validator';

export class CreateTemplateDto {
    @IsNotEmpty() title: string;
    templateName: string;
    data: string;
    cc: string;
    bcc: string;
    attachment: string;
    serviceId: number;
}
