import { Role } from 'src/utils/role.enum';
import { Room } from 'src/chat/entities/room.entity';

export class UserI {
  id: number;
  username: string;
  email: string;
  password: string;
  hashedRT: string | null;
  role: Role;
  rooms: Room[];
}
