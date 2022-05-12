import { EntityRepository, Repository } from 'typeorm';
import { Template } from './template.entity';
import { GetTemplateFilterDto } from './dto/get-template-filter.dto';
import { CreateTemplateDto, AttachmentDto, TemplateDto } from './dto/template-dtos';
import { modelTemplateData, SaveFileFromBase64, toString } from 'src/utils/common';
import { InternalServerErrorException } from '@nestjs/common';
@EntityRepository(Template)
export class TemplateRepository extends Repository<Template> {
    async getTemplates(filterDto: GetTemplateFilterDto): Promise<{ templates: TemplateDto[]; count: number }> {
        const { search } = filterDto;
        const query = this.createQueryBuilder('template');
        if (search) query.andWhere('(template.title LIKE :search)', { search: `%${search}%` });
        const [result, count] = await query.getManyAndCount();
        const templates = result.reduce((acc, curr) => [...acc, modelTemplateData(curr)], []);
        return { templates: templates, count };
    }

    async createTemplate(createServiceDto: CreateTemplateDto): Promise<TemplateDto> {
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
                    attachmentData: toString(curr.attachmentData)
                };
                const acc = await accP;
                return [...acc, data];
            }, Promise.resolve([]));
        }
        const template = new Template();
        template.title = title;
        template.templateName = fileName;
        template.data = toString(data);
        template.cc = cc;
        template.bcc = bcc;
        template.serviceId = serviceId;
        template.attachment = JSON.stringify(attachmentArr);
        await template.save();
        return modelTemplateData(template);
    }
}
