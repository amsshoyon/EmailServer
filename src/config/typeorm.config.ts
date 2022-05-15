import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
const dbConfig: any = config.get('db');

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type as any,
    host: process.env.DB_HOST || dbConfig.host,
    port: parseInt(process.env.DB_PORT || dbConfig.port),
    username: process.env.DB_USERNAME || dbConfig.user,
    password: process.env.DB_PASSWORD || dbConfig.password,
    database: process.env.DB_DATABASE || dbConfig.name,
    entities: [`dist/**/*.entity{.ts,.js}`],
    synchronize: dbConfig.synchronize
};
