import { DataSource } from 'typeorm';
import { Product } from './src/product/entities/product.entity'; // adjust as needed

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'your_mysql_user',
  password: 'Raradagugu123',
  database: 'KAPO',
  entities: [Product],
  synchronize: false, // use migrations in production
  migrations: ['src/migrations/*.ts'],
});
