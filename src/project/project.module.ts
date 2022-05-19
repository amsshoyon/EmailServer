import { ProjectRepository } from './project.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([ProjectRepository]), AuthModule],
    controllers: [ProjectController],
    providers: [ProjectService]
})
export class ProjectModule {}
