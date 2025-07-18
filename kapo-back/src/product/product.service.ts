import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


// src/product/product.service.ts
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
interface FilterParams {
  gender?: string;
  type?: string;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Create a new product
  async createProduct(name: string, price: number, image: string ,  description: string, type: string, gender: string, images?: string[]): Promise<Product> {
    const product = this.productRepository.create({ name, price, image, description, type, gender, images  });
    return await this.productRepository.save(product);
  }

  // Get all products
  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // Get a product by ID - UPDATED CODE
  async getProductById(id: number): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id } }); // Correct usage of findOne with options
  }

  // Update product
  async updateProduct(id: number, name: string, price: number, image: string): Promise<Product  | null> {
    await this.productRepository.update(id, { name, price, image });
    return this.productRepository.findOne({ where: { id } }); // Same fix here
  }

  // Delete product
  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
 async findFiltered(filters: FilterParams): Promise<Product[]> {
    const { gender, type } = filters;

    const query = this.productRepository.createQueryBuilder('product');

    if (gender) {
      query.andWhere('product.gender = :gender', { gender });
    }

    if (type) {
      query.andWhere('product.type = :type', { type });
    }

    return await query.getMany();
  }
  
}