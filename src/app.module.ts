import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServiceModule } from './service/service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { TemplateModule } from './template/template.module';
import { FileModule } from './file/file.module';
import { SendMailModule } from './send-mail/send-mail.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRoot(TypeOrmConfig),
        ServiceModule,
        AuthModule,
        TemplateModule,
        FileModule,
        SendMailModule
    ]
})
export class AppModule {
    constructor(private connection: Connection) {}
}
