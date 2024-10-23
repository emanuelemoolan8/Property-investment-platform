import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
