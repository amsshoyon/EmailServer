import { EntityRepository, Repository } from 'typeorm';
import { Template } from './template.entity';
import { GetTemplateFilterDto } from './dto/get-template-filter.dto';
import { CreateTemplateDto } from './dto/create-template-dto';

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
        const { title, templateName, serviceId, data } = createServiceDto;
        const template = new Template();
        template.title = title;
        template.template = templateName;
        template.data = data;
        template.serviceId = serviceId;
        await template.save();
        return template;
    }
}
