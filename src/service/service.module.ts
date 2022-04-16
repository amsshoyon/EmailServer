import { ServiceRepository } from './service.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([ServiceRepository]), AuthModule],
    controllers: [ServiceController],
    providers: [ServiceService]
})
export class ServiceModule {}
