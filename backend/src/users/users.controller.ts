import { Controller, Get, Param } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.find();
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }
}
