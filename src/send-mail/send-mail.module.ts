import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateRepository } from 'src/template/template.repository';
import { SendMailController } from './send-mail.controller';
import { SendMailService } from './send-mail.service';

@Module({
    imports: [TypeOrmModule.forFeature([TemplateRepository])],
    controllers: [SendMailController],
    providers: [SendMailService]
})
export class SendMailModule {}
