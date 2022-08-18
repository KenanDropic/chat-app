import { Expose, Transform } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';

export class RoomDto {
  @Transform(({ obj }) => console.log('Transform OBJECT:', obj))
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string | null;

  @Expose()
  users: UserDto[];

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
