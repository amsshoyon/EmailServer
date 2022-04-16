import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServiceModule } from './service/service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRoot(TypeOrmConfig),
        ServiceModule,
        AuthModule
    ]
})
export class AppModule {
    constructor(private connection: Connection) {}
}
