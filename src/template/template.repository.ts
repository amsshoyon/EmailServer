import { EntityRepository, Repository } from 'typeorm';
import { Template } from './template.entity';
import { GetTemplateFilterDto } from './dto/get-template-filter.dto';
import { AttachmentDto, CreateTemplateDto } from './dto/create-template-dto';
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
        let attachmentString = '';
        if (attachment && attachment.length) {
            const attachmentArr = attachment.reduce(async (acc: any, curr) => {
                const attachmentName = await SaveFileFromBase64(curr.attachmentName, `attachment_${title}`);
                if (!attachmentName) throw new InternalServerErrorException(`Error writting file`);
                const data = {
                    attachmentName: attachmentName,
                    attachmentData: curr.attachmentData
                };
                return acc.push(data);
            }, []);
            attachmentString = JSON.stringify(attachmentArr);
        }
        const template = new Template();
        template.title = title;
        template.template = fileName;
        template.data = data;
        template.cc = cc;
        template.bcc = bcc;
        template.serviceId = serviceId;
        template.attachment = attachmentString;
        // await template.save();
        return template;
    }
}
