import { CreateServiceDto } from './dto/create-service-dto';
import { Injectable } from '@nestjs/common';
import { Service } from './service.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ServiceService {
    private services: Service[] = [];

    getAllServices() {
        return this.services;
    }

    getServiceById(id: string): Service {
        return this.services.find((service) => service.id === id);
    }

    createService(createServiceDto: CreateServiceDto): Service {
        const { title } = createServiceDto;

        const service: Service = {
            id: uuid(),
            title
        };

        this.services.push(service);
        return service;
    }

    deleteService(id: string): void {
        this.services = this.services.filter((service) => service.id !== id);
    }
}
