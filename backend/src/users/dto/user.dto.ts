import { Expose, Transform } from 'class-transformer';
import { Role } from 'src/utils/role.enum';

export class UserDto {
  // @Transform(({ obj }) => console.log('OBJ', obj.data))
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  role: Role;
}
