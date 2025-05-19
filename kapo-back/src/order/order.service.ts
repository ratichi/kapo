import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
      constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}


async create(data: any): Promise<Order> {
  const order = this.orderRepository.create({
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    items: data.cart, // must match what frontend sends
  })
  return this.orderRepository.save(order)
}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
