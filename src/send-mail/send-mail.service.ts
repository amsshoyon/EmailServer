import * as fs from 'fs';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { modelTemplateData } from 'src/utils/common';
import { EmailDto } from './dto/mailDto';
import { join } from 'path';
import { Mailer } from 'src/utils/sendMail';
import { pdfGenerator } from 'src/utils/pdfGenerator';
import { TemplateService } from 'src/template/template.service';
const ejs = require('ejs');

@Injectable()
export class SendMailService {
    constructor(private templateService: TemplateService) {}

    async sendEmail(emailDto: EmailDto): Promise<any> {
        const { serviceId, data } = emailDto;
        const template = await this.templateService.getTemplateById(parseInt(serviceId));
        if (!template) throw new NotFoundException(`Template with id ${serviceId} not found`);
        const dataModel = modelTemplateData(template);
        const templateName = dataModel.templateName;

        const attachments = await dataModel.attachment.reduce(async (acc, curr) => {
            const buffer = await pdfGenerator(curr.attachmentName, curr.attachmentData);
            const attachmentObj = {
                filename: curr.attachmentName.replace('.html', '.pdf'),
                content: buffer
            };
            return [...(await acc), attachmentObj];
        }, Promise.resolve([]));

        try {
            const templateHtml = fs.readFileSync(join(process.cwd(), `storage/${templateName}`), 'utf8');
            const html = ejs.render(templateHtml, dataModel.templateData);
            const message = {
                to: 'amsshoyon@gmail.com',
                cc: dataModel.cc,
                bcc: dataModel.bcc,
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
