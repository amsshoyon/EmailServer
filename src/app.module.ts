import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServiceModule } from './service/service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { Service } from './service/service.entity';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRoot({
            ...TypeOrmConfig,
            entities: [Service]
        }),
        ServiceModule
    ]
})
export class AppModule {
    constructor(private connection: Connection) {}
}
