import { CreateServiceDto } from './dto/create-service-dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { GetServiceFilterDto } from './dto/get-service-filter.dto';
import { ServiceRepository } from './service.repository';

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(ServiceRepository)
        private serviceRepository: ServiceRepository
    ) {}

    async getAllServices(filterDto: GetServiceFilterDto): Promise<Service[]> {
        return this.serviceRepository.getServices(filterDto);
    }

    async getServiceById(id: number): Promise<Service> {
        const service = await this.serviceRepository.findOne(id);
        if (!service) throw new NotFoundException(`Service with id ${id} not found`);
        return service;
    }

    async createService(createServiceDto: CreateServiceDto): Promise<Service> {
        return this.serviceRepository.createService(createServiceDto);
    }

    async deleteService(id: number): Promise<void> {
        const result = await this.serviceRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException(`Task with ID "${id}" not found`);
    }
}
