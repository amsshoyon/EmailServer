import { CreateServiceDto } from './dto/create-service-dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service } from './service.entity';
import { GetServiceFilterDto } from './dto/get-service-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResponseInterceptor } from 'src/interceptor/ResponseInterceptor';

@Controller('service')
@UseGuards(AuthGuard())
@UseInterceptors(ResponseInterceptor)
export class ServiceController {
    constructor(private serviceService: ServiceService) {}

    @Get()
    getAllServices(@Query(ValidationPipe) filterDto: GetServiceFilterDto) {
        return this.serviceService.getAllServices(filterDto);
    }

    @Get('/:id')
    getServiceById(@Param('id', ParseIntPipe) id: number): Promise<Service> {
        return this.serviceService.getServiceById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createService(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
        return this.serviceService.createService(createServiceDto);
    }

    @Delete('/:id')
    deleteService(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.serviceService.deleteService(id);
    }
}
