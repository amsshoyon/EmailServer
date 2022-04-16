import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const dotenv = require('dotenv');
dotenv.config();

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true
};
