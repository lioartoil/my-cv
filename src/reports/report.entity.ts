import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/users/user.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lat: number;

  @Column()
  long: number;

  @Column()
  make: string;

  @Column()
  mileage: number;

  @Column()
  model: string;

  @Column()
  price: number;

  @Column()
  year: number;

  @ManyToOne(() => User, user => user.reports)
  user: User;
}
