import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersModule } from './orders/orders.module'; // Import your OrdersModule
// import { ProductsModule } from './products/products.module'; // Import your ProductsModule (if needed)
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfig } from './config/database.config'; // Database configuration class (if you use it)

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available globally in the application
      envFilePath: '.env', // If you have a custom .env file, specify its path here
    }),
    SequelizeModule.forRootAsync({
      useClass: DatabaseConfig, // You can use the DatabaseConfig class here for dynamic database configuration
    }),
    OrdersModule, // Import OrdersModule here
    // ProductsModule,
  ],
  controllers: [AppController], // List of controllers for handling incoming requests
  providers: [AppService], // List of providers (services) used in your app
})
export class AppModule {}
