import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
