import { IsArray, IsOptional, IsString } from 'class-validator';
import { UserI } from '../../users/dto/user.interface';

export class RoomDataDto {
  @IsString()
  name: string;

  @IsOptional()
  description: string;

  @IsArray()
  users: UserI[];
}
