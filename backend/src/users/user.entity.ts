import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/utils/role.enum';
import { Room } from 'src/chat/entities/room.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: null, nullable: true })
  hashedRT: string | null;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @ManyToMany(() => Room, (room) => room.users)
  rooms: Room[];

  // this will happen if password get's modified,that by default gets checked by postgres.
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt: string = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.email.toLowerCase();
  }
}
