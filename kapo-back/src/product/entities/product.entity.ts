import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';

// src/product/entities/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // This decorator defines the class as an entity for TypeORM
export class Product {
  @PrimaryGeneratedColumn() // Automatically generates a unique ID for each product
  id: number;

  @Column() // Defines the name of the column in the table
  name: string;

  @Column('decimal') // Defines the price column with a decimal type
  price: number;

  @Column({ nullable: true }) // The image column can be null
  image: string;
}
