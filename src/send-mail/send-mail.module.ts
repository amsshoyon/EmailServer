import { TemplateService } from './../template/template.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateRepository } from 'src/template/template.repository';
import { SendMailController } from './send-mail.controller';
import { SendMailService } from './send-mail.service';

@Module({
    imports: [TypeOrmModule.forFeature([TemplateRepository])],
    controllers: [SendMailController],
    providers: [TemplateService, SendMailService]
})
export class SendMailModule {}
