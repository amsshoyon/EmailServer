import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';

async function bootstrap() {
    const port = process.env.PORT ? process.env.PORT : 3000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    console.log(`App started on port ${port}`);
    await app.listen(port);
}
bootstrap();
