import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';

async function bootstrap() {
    const logger = new Logger('bootstrap');
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Mailer APIs')
        .setVersion('1.0')
        .addBearerAuth(
            { 
                description: `[just text field] Please enter token in following format: Bearer <JWT>`,
                name: 'Authorization',
                bearerFormat: 'Bearer',
                scheme: 'Bearer',
                type: 'http',
                in: 'Header'
            },
            'access-token',
        )
        .build();
    const port = process.env.PORT || 8000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document, {
        swaggerOptions: { defaultModelsExpandDepth: -1 }
    });
    logger.log(`App started on port ${port}`);
    await app.listen(port);
}
bootstrap();
