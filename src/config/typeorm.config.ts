import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const dotenv = require('dotenv');
dotenv.config();

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [`dist/**/*.entity{.ts,.js}`],
    synchronize: true
};
