import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { PageOptionsDto } from 'src/pagination/dto/page-options.dto';
import { PageDto } from 'src/pagination/dto/page.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get()
  findAll(@Query() query: PageOptionsDto): Promise<PageDto<UserDto>> {
    return this.usersService.find(query);
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }
}
