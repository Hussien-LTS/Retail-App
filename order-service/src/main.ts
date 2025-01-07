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
      port: parseInt(process.env.ORDER_SERVICE_PORT, 10) || 4000,
    },
  });
  app.enableCors();
  await app.startAllMicroservices(); // Start the microservice
  await app.listen(parseInt(process.env.REST_API_PORT, 10) || 4001); // Start the REST API

  console.log(
    `Order-service is running: REST API on port ${
      process.env.REST_API_PORT || 4001
    } and Microservice on port ${process.env.ORDER_SERVICE_PORT || 4000}`,
  );
}
bootstrap();
