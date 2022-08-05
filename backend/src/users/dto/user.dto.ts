import { Expose } from 'class-transformer';
import { Role } from 'src/utils/role.enum';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  role: Role;
}
