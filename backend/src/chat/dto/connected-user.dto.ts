import { IsObject, IsString } from 'class-validator';
import { UserI } from 'src/users/dto/user.interface';

export class ConnectedUserDto {
  @IsString()
  socketId: string;

  @IsObject()
  user: UserI;
}
