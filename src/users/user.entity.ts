import {
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Report } from 'src/reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  admin: boolean;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, report => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.info(`Inserted user with ID ${this.id}`);
  }

  @BeforeRemove()
  logRemove() {
    console.info(`Removed user with ID ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.info(`Updated user with ID ${this.id}`);
  }
}
