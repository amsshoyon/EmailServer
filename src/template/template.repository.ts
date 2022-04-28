import { EntityRepository, Repository } from 'typeorm';
import { Template } from './template.entity';
import { GetTemplateFilterDto } from './dto/get-template-filter.dto';
import { CreateTemplateDto, AttachmentDto } from './dto/create-template-dto';
import { SaveFileFromBase64 } from 'src/utils/common';
import { InternalServerErrorException } from '@nestjs/common';
@EntityRepository(Template)
export class TemplateRepository extends Repository<Template> {
    async getTemplates(filterDto: GetTemplateFilterDto): Promise<{ result: Template[]; count: number }> {
        const { search } = filterDto;
        const query = this.createQueryBuilder('template');
        if (search) query.andWhere('(template.title LIKE :search)', { search: `%${search}%` });
        const [result, count] = await query.getManyAndCount();
        return { result, count };
    }

    async createTemplate(createServiceDto: CreateTemplateDto): Promise<Template> {
        const { title, templateName, serviceId, data, cc, bcc, attachment } = createServiceDto;
        const fileName = await SaveFileFromBase64(templateName, title);
        if (!fileName) throw new InternalServerErrorException(`Error writting file`);
        let attachmentArr = [];
        if (attachment && attachment.length) {
            attachmentArr = await attachment.reduce(async (accP: any, curr): Promise<AttachmentDto[]> => {
                const attachmentName = await SaveFileFromBase64(curr.attachmentName, `attachment_${title}`);
                if (!attachmentName) throw new InternalServerErrorException(`Error writting file`);
                const data = {
                    attachmentName: attachmentName,
                    attachmentData: curr.attachmentData
                };
                const acc = await accP;
                return [...acc, data];
            }, Promise.resolve([]));
        }
        const template = new Template();
        template.title = title;
        template.templateName = fileName;
        template.data = data;
        template.cc = cc;
        template.bcc = bcc;
        template.serviceId = serviceId;
        template.attachment = JSON.stringify(attachmentArr);
        await template.save();
        template.attachment = JSON.parse(template.attachment);
        return template;
    }
}
