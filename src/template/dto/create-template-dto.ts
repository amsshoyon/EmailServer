import { IsNotEmpty } from 'class-validator';

export class AttachmentDto {
    attachmentName: string;
    attachmentData: string;
}
export class CreateTemplateDto {
    @IsNotEmpty() title: string;
    templateName: string;
    data: string;
    cc: string;
    bcc: string;
    attachment: AttachmentDto[];
    serviceId: number;
}
