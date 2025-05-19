import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { ProductModule } from './product/product.module'
import { UploadModule } from './upload/upload.module';
import { OrderModule } from './order/order.module';
import { PayzeService } from './payze/payze.service';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
      TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: () => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
  }),
}),
    ProductModule,
    UploadModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, PayzeService],
})
export class AppModule {}








