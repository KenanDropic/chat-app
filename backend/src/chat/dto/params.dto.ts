import { Room } from '../entities/room.entity';

export class ParamsDto {
  room: Room;
  meta: Meta;
}

interface Meta {
  pageMsg: number;
  take: number;
  skip: number;
}
