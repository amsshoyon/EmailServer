import { CreateServiceDto } from './dto/create-service-dto';
import { Service } from './service.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetServiceFilterDto } from './dto/get-service-filter.dto';

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {
    async getServices(filterDto: GetServiceFilterDto): Promise<{ result: Service[]; count: number }> {
        const { search } = filterDto;
        const query = this.createQueryBuilder('service');
        if (search) query.andWhere('(service.title LIKE :search)', { search: `%${search}%` });
        const [result, count] = await query.getManyAndCount();
        return { result, count };
    }

    async createService(createServiceDto: CreateServiceDto): Promise<Service> {
        const { title } = createServiceDto;
        const service = new Service();
        service.title = title;
        await service.save();
        return service;
    }
}
