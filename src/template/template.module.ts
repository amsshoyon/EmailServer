import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TemplateController } from './template.controller';
import { TemplateRepository } from './template.repository';
import { TemplateService } from './template.service';

@Module({
    imports: [TypeOrmModule.forFeature([TemplateRepository]), AuthModule],
    controllers: [TemplateController],
    providers: [TemplateService]
})
export class TemplateModule {}
