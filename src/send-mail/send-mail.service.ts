import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from 'src/template/template.entity';
import { TemplateRepository } from 'src/template/template.repository';
import { modelTemplateData } from 'src/utils/common';
import { EmailDto } from './dto/mailDto';
import * as fs from 'fs';
import { join } from 'path';
import { Mailer } from 'src/utils/sendMail';
const ejs = require('ejs');

@Injectable()
export class SendMailService {
    constructor(
        @InjectRepository(TemplateRepository)
        private templateRepository: TemplateRepository
    ) {}

    async getTemplateById(id: number): Promise<Template> {
        const template = await this.templateRepository.findOne(id);
        if (!template) throw new NotFoundException(`Template with id ${id} not found`);
        template.attachment = JSON.parse(template.attachment);
        return template;
    }

    async sendEmail(emailDto: EmailDto): Promise<any> {
        const { serviceId, data } = emailDto;
        const template = await this.templateRepository.findOne(serviceId);
        if (!template) throw new NotFoundException(`Template with id ${serviceId} not found`);
        const dataModel = modelTemplateData(template);
        const templateName = dataModel.templateName;
        fs.readFile(join(process.cwd(), `storage/${templateName}`), 'utf8', async (error, data) => {
            if (error) console.log(`ERROR: ${error}`);

            const html = ejs.render(data, dataModel.templateData);
            const message = {
                to: 'amsshoyon@gmail.com',
                cc: dataModel.cc,
                bcc: dataModel.bcc,
                subject: 'test email',
                html: html
            };

            const mail = await Mailer(message);
        });
    }
}
