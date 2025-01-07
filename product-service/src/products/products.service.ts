import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productModel.create({ ...createProductDto });
  }

  findAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  findOne(id: number): Promise<Product> {
    return this.productModel.findByPk(id);
  }

  update(id: number, productData: any): Promise<[number]> {
    return this.productModel.update(productData, { where: { id } });
  }

  delete(id: number): Promise<number> {
    return this.productModel.destroy({ where: { id } });
  }
}
