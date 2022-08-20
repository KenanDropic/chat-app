import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ConnectedUserDto } from './dto/connected-user.dto';
import { ConnectedUser } from './entities/connected-user-entity';

@Injectable()
export class ConnectedUserService {
  constructor(
    @InjectRepository(ConnectedUser)
    private readonly repo: Repository<ConnectedUser>,
  ) {}

  async create(connectedUser: ConnectedUserDto): Promise<ConnectedUser> {
    return this.repo.save(connectedUser);
  }

  async findByUser(user: UserDto): Promise<ConnectedUser[]> {
    const users = this.repo.findBy({ user });

    return await users;
  }

  async findConnectedUsers(socketId: string): Promise<ConnectedUser[]> {
    const users: ConnectedUser[] = await this.repo
      .createQueryBuilder('connectedUser')
      .leftJoin('connectedUser.user', 'user')
      .select([
        'connectedUser',
        'user.id',
        'user.username',
        'user.email',
        'user.role',
      ])
      // .where('connectedUser.socketId = :socketId', { socketId })
      .getMany();

    return users;
  }

  async deleteBySocketId(socketId: string): Promise<DeleteResult> {
    return this.repo.delete({ socketId });
  }

  async deleteAll() {
    return await this.repo.createQueryBuilder().delete().execute();
  }
}
