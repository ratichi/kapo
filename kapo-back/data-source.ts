import { DataSource } from 'typeorm';
import { Product } from './src/product/entities/product.entity'; // adjust as needed
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Product],
  synchronize: false, // use migrations in production
  migrations: ['src/migrations/*.ts'],
});
