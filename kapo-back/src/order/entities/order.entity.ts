// order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  address: string

  @Column('json') // VERY IMPORTANT: this must be json or text
  items: any
}
