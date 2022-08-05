import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/auth/dto/index';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async find() {
    const users = await this.repo.find({});

    if (!users) throw new NotFoundException('Users not found');

    return users;
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
        email,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  create(args: RegisterUserDto): Promise<User> {
    if (!args) throw new BadRequestException();

    const user: User = this.repo.create(args);

    return this.repo.save(user);
  }
}
