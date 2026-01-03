import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './loans.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  @Get('stats')
  async getStats() {
    return await this.productsService.getStats();
  }

  @Post()
  async createProduct(@Body() productData: any) {
    return await this.productsService.createProduct(productData);
  }

  @Post('seed')
  async seedProducts() {
    await this.productsService.seedProducts();
    return { message: 'Sample products seeded successfully' };
  }
}
