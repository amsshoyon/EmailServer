import { CreateServiceDto } from './dto/create-service-dto';
import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service } from './service.model';

@Controller('service')
export class ServiceController {
    constructor(private serviceService: ServiceService) {}

    @Get()
    getAllServices() {
        return this.serviceService.getAllServices();
    }

    @Get('/:id')
    getServiceById(@Param('id') id: string) {
        return this.serviceService.getServiceById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createService(@Body() createServiceDto: CreateServiceDto): Service {
        return this.serviceService.createService(createServiceDto);
    }

    @Delete('/:id')
    deleteService(@Param('id') id: string) {
        this.serviceService.deleteService(id);
    }
}
