import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model'; // Ensure you have this model file
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forFeature([Order]), // Ensure the Order model is registered
    HttpModule, // This is to use HttpService for making requests to the product service
    ConfigModule, // This is to use ConfigService to manage environment variables
  ],
  providers: [OrdersService], // Provide the OrdersService as a provider
  controllers: [OrdersController], // Provide the OrdersController to handle the requests
})
export class OrdersModule {}
