import { ServiceRepository } from './service.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
    imports: [TypeOrmModule.forFeature([ServiceRepository])],
    controllers: [ServiceController],
    providers: [ServiceService]
})
export class ServiceModule {}
