import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/auth/dto/index';
import { PageMetaDto } from 'src/pagination/dto/page-meta.dto';
import { PageOptionsDto } from 'src/pagination/dto/page-options.dto';
import { PageDto } from 'src/pagination/dto/page.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async find(query: PageOptionsDto): Promise<PageDto<User>> {
    const users = this.repo.createQueryBuilder('users');

    users.skip(query.skip).take(query.take);

    if (!users) throw new NotFoundException('Users not found');

    const itemCount = await users.getCount();
    const { entities } = await users.getRawAndEntities();

    const pageMeta: PageMetaDto = new PageMetaDto({ itemCount, query });

    return new PageDto(entities, pageMeta);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.repo.findOne({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.repo.findOne({
      where: {
        email: email,
      },
    });

    return user;
  }

  create(args: RegisterUserDto): Promise<User> {
    if (!args) throw new BadRequestException();

    const user: User = this.repo.create(args);

    return this.repo.save(user);
  }
}
