import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { json } from 'express';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { AuthService } from './modules/auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiVersion = process.env.API_VERSION || 'v1';
  app.setGlobalPrefix(`api/${apiVersion}`);
  app.use(json({ limit: '50mb' }));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('habit API')
    .setDescription('habit api description')
    .setVersion('1.0')
    .addTag('habit-api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api_doc', app, document, {
    customSiteTitle: 'Habit Test API Documentation',
  });

  const authService = app.get(AuthService);
  await authService.addAdminUserIfNotExists();

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
