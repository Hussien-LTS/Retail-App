import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Order } from './order.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.orderModel.findAll();
  }

  async findOne(id: number): Promise<Order> {
    return await this.orderModel.findByPk(id);
  }

  async update(id: number, orderData: any): Promise<[number]> {
    return await this.orderModel.update(orderData, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    return await this.orderModel.destroy({ where: { id } });
  }

  async createOrder(orderData: { productId: number; quantity: number }) {
    const productServiceUrl = this.configService.get<string>(
      'PRODUCT_SERVICE_URL',
    );
    const productUrl = `${productServiceUrl}/products/${orderData.productId}`;

    let product;
    try {
      const { data } = await firstValueFrom(this.httpService.get(productUrl));
      product = data;
    } catch (error) {
      throw new NotFoundException({
        'Product service is unavailable or product not found': error,
      });
    }

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const totalPrice = product.price * orderData.quantity;

    const order = await this.orderModel.create({
      productId: orderData.productId,
      quantity: orderData.quantity,
      totalPrice,
    });

    return order;
  }
}
