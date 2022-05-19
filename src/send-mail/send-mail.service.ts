import * as fs from 'fs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailDto } from './dto/mailDto';
import { join } from 'path';
import { Mailer } from 'src/utils/sendMail';
import { pdfGenerator } from 'src/utils/pdfGenerator';
import { TemplateService } from 'src/template/template.service';
import ejs = require('ejs');

@Injectable()
export class SendMailService {
    constructor(private templateService: TemplateService) {}

    async sendEmail(emailDto: EmailDto): Promise<any> {
        const { templateId, data } = emailDto;
        const template = await this.templateService.getTemplateById(parseInt(templateId));
        const templateName = template.templateName;

        const attachments = await template.attachment.reduce(async (acc, curr) => {
            const buffer = await pdfGenerator(curr.attachmentName, curr.attachmentData);
            const attachmentObj = {
                filename: curr.attachmentName.replace('.html', '.pdf'),
                content: buffer
            };
            return [...(await acc), attachmentObj];
        }, Promise.resolve([]));
        try {
            const templateHtml = fs.readFileSync(join(process.cwd(), `storage/${templateName}`), 'utf8');
            const html = ejs.render(templateHtml, template.templateData);
            const message = {
                to: 'amsshoyon@gmail.com',
                cc: template.cc,
                bcc: template.bcc,
                subject: 'test email',
                html: html,
                attachments: attachments
            };
            try {
                return await Mailer(message);
            } catch (err) {
                throw new BadRequestException(err);
            }
        } catch (err) {
            throw new BadRequestException(err);
        }
    }
}
