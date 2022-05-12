import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from 'src/template/template.entity';
import { TemplateRepository } from 'src/template/template.repository';
import { modelTemplateData } from 'src/utils/common';
import { EmailDto } from './dto/mailDto';
import * as fs from 'fs';
const ejs = require('ejs');
import { join } from 'path';
import { Mailer } from 'src/utils/sendMail';
import { pdfGenerator } from 'src/utils/pdfGenerator';
const puppeteer = require('puppeteer');

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
