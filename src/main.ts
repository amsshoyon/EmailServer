import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';

async function bootstrap() {
    const logger = new Logger('bootstrap');
    const port = process.env.PORT || 8000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    logger.log(`App started on port ${port}`);
    await app.listen(port);
}
bootstrap();
