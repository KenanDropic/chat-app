import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/users/dto/user.dto';
import { DeleteResult, Repository } from 'typeorm';
import { ConnectedUser } from './entities/connected-user-entity';

@Injectable()
export class ConnectedUserService {
  constructor(
    @InjectRepository(ConnectedUser)
    private readonly repo: Repository<ConnectedUser>,
  ) {}

  async create(connectedUser: ConnectedUser): Promise<ConnectedUser> {
    return this.repo.save(connectedUser);
  }

  async findByUser(user: UserDto): Promise<ConnectedUser[]> {
    const users = this.repo.findBy({ user });

    return await users;
  }

  async deleteBySocketId(socketId: string): Promise<DeleteResult> {
    return this.repo.delete({ socketId });
  }
}
