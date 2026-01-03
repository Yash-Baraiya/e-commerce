import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getStats() {
    const products = await this.productRepository.find();
    const totalProducts = products.length;
    const inStock = products.filter((p) => p.stock > 0).length;
    const outOfStock = products.filter((p) => p.stock === 0).length;
    const lowStock = products.filter(
      (p) => p.stock > 0 && p.stock < 20,
    ).length;
    const totalRevenue = products.reduce(
      (sum, product) => sum + Number(product.price) * product.sold,
      0,
    );
    const totalSold = products.reduce((sum, product) => sum + product.sold, 0);
    const avgRating =
      totalProducts > 0
        ? products.reduce((sum, product) => sum + Number(product.rating), 0) /
          totalProducts
        : 0;

    return {
      totalProducts,
      inStock,
      outOfStock,
      lowStock,
      totalRevenue,
      totalSold,
      avgRating: parseFloat(avgRating.toFixed(2)),
    };
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create({
      ...productData,
      sold: 0,
      rating: 0,
      status: (productData.stock || 0) > 0 ? 'In Stock' : 'Out of Stock',
    });
    return await this.productRepository.save(product);
  }

  // Helper method to seed initial data
  async seedProducts() {
    const count = await this.productRepository.count();
    if (count > 0) return; // Already seeded

    const sampleProducts = [
      {
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 2999,
        stock: 45,
        sold: 128,
        rating: 4.5,
        image: 'headphones.jpg',
        status: 'In Stock',
      },
      {
        name: 'Smart Watch',
        category: 'Electronics',
        price: 8999,
        stock: 23,
        sold: 89,
        rating: 4.3,
        image: 'smartwatch.jpg',
        status: 'In Stock',
      },
      {
        name: 'Running Shoes',
        category: 'Fashion',
        price: 3499,
        stock: 67,
        sold: 234,
        rating: 4.7,
        image: 'shoes.jpg',
        status: 'In Stock',
      },
      {
        name: 'Laptop Backpack',
        category: 'Accessories',
        price: 1299,
        stock: 0,
        sold: 156,
        rating: 4.2,
        image: 'backpack.jpg',
        status: 'Out of Stock',
      },
      {
        name: 'Bluetooth Speaker',
        category: 'Electronics',
        price: 1999,
        stock: 89,
        sold: 312,
        rating: 4.6,
        image: 'speaker.jpg',
        status: 'In Stock',
      },
      {
        name: 'Coffee Maker',
        category: 'Home & Kitchen',
        price: 4599,
        stock: 12,
        sold: 67,
        rating: 4.4,
        image: 'coffee.jpg',
        status: 'Low Stock',
      },
      {
        name: 'Yoga Mat',
        category: 'Sports',
        price: 899,
        stock: 156,
        sold: 423,
        rating: 4.8,
        image: 'yoga.jpg',
        status: 'In Stock',
      },
      {
        name: 'Phone Case',
        category: 'Accessories',
        price: 499,
        stock: 234,
        sold: 678,
        rating: 4.1,
        image: 'case.jpg',
        status: 'In Stock',
      },
    ];

    await this.productRepository.save(sampleProducts);
  }
}
