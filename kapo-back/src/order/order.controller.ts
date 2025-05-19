import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PayzeService } from 'src/payze/payze.service';



@Controller('order')
export class OrderController {
constructor(private readonly orderService: OrderService, private readonly payzeService: PayzeService) {}

  @Post()
  async createOrder(@Body() body: any) {
    return this.orderService.create(body);
  }
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
  @Post('payze-webhook')
handleWebhook(@Body() body: any) {
  console.log('🔔 PAYZE WEBHOOK RECEIVED:', body);
  return { received: true };
}
@Post('init-payment')
  @Post('init-payment')
  async initPayment(@Body() body: { amount: number; email: string; phone: string }) {
    const { amount, email, phone } = body;

    // Replace this with your actual deployed frontend URL (or tunnel during testing)
    const callbackUrl = 'https://your-frontend-or-tunnel-url.com';

    const transactionUrl = await this.payzeService.createPayment(amount, callbackUrl, email, phone);
    return { transactionUrl };
  }
}
