import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseConfig } from './config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRootAsync({
      useClass: DatabaseConfig, // You can use the DatabaseConfig class here for dynamic database configuration
    }),
    ProductsModule,
  ],
  controllers: [AppController], // List of controllers for handling incoming requests
  providers: [AppService],
})
export class AppModule {}
