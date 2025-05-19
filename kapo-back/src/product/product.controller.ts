
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// src/product/product.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Create a new product
  @Post()
  async create(@Body() body: { name: string; price: number; image: string;  description:string; type:string; gender:string }): Promise<Product> {
    const { name, price, image, description,  type, gender } = body;
    return this.productService.createProduct(name, price, image,  description, type, gender, );
  }

  // Get all products
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  // Get a product by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product | null> {
    return this.productService.getProductById(id);
  }

  // Update a product
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { name: string; price: number; image: string },
  ): Promise<Product | null> {
    const { name, price, image } = body;
    return this.productService.updateProduct(id, name, price, image);
  }

    async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts(); // This will query the database
  }

  // Delete a product
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
