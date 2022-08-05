import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/utils/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '' })
  hashedRT: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  //   @OneToMany(() => Order, (order) => order.user)
  //   orders: Order[];

  // this will happen if password get's modified,that by default gets checked by postgres.
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt: string = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
