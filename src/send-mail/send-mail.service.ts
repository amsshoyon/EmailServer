import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from 'src/template/template.entity';
import { TemplateRepository } from 'src/template/template.repository';

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

    async sendEmail(id: number): Promise<Template> {
        const template = await this.templateRepository.findOne(id);
        if (!template) throw new NotFoundException(`Template with id ${id} not found`);
        template.attachment = JSON.parse(template.attachment);
        return template;
    }
}
