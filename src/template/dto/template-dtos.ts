import { IsNotEmpty } from 'class-validator';

export class AttachmentDto {
    attachmentName: string;
    attachmentData: string;
}

export class CreateTemplateDto {
    @IsNotEmpty() title: string;
    templateName: string;
    templateData: string;
    cc: string;
    bcc: string;
    attachment: AttachmentDto[];
    projectId: number;
}

export class TemplateDto {
    id: number;
    title: string;
    projectId: number;
    templateName: string;
    templateData: object;
    cc: string;
    bcc: string;
    attachment: {
        attachmentName: string;
        attachmentData: object;
    }[];
}