import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConnectedUser } from './entities/connected-user-entity';
import { Room } from './entities/room.entity';

@Injectable()
export class ConnectedUserService {
  constructor(
    @InjectRepository(Room) private readonly repo: Repository<ConnectedUser>,
  ) {}
}
