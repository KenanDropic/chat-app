import { IsString } from 'class-validator';
import { User } from 'src/users/user.entity';
import { Room } from '../entities/room.entity';

export class JoinedRoomDto {
  @IsString()
  socketId: string;

  user: User;

  room: Room;
}
