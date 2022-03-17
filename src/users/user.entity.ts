import {
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.info(`Inserted user with ID ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.info(`Updated user with ID ${this.id}`);
  }

  @BeforeRemove()
  logRemove() {
    console.info(`Removed user with ID ${this.id}`);
  }
}
