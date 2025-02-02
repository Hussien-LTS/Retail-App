import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable ValidationPipe for the REST API
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Microservice TCP transport
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: parseInt(process.env.PRODUCT_SERVICE_PORT, 10) || 3000,
    },
  });

  await app.startAllMicroservices(); // Start the microservice
  app.enableCors();
  await app.listen(parseInt(process.env.REST_API_PORT, 10) || 3001); // Start the REST API

  console.log(
    `Product-service is running: REST API on port ${
      process.env.REST_API_PORT || 3001
    } and Microservice on port ${process.env.PRODUCT_SERVICE_PORT || 3000}`,
  );
}
bootstrap();
