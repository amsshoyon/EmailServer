import { IsNotEmpty } from 'class-validator';

class AttachmentDto {
    attachmentName: string;
    attachmentData: any;
}

class TemplateDto {
    templateData: any;
    attachmentData: AttachmentDto[];
}

export class EmailDto {
    @IsNotEmpty() serviceId: string;
    @IsNotEmpty() data: TemplateDto;
}
