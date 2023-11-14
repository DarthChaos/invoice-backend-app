import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cashier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email?: string;
}
