import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ConnectedUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  socketId: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
