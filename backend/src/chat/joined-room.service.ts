import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/users/dto/user.dto';
import { DeleteResult, Repository } from 'typeorm';
import { JoinedRoomDto } from './dto/joined-room.dto';
import { RoomDto } from './dto/room.dto';
import { JoinedRoom } from './entities/joined-room.entity';

@Injectable()
export class JoinedRoomService {
  constructor(
    @InjectRepository(JoinedRoom)
    private readonly repo: Repository<JoinedRoom>,
  ) {}

  async create(joinedRoomUser: JoinedRoomDto): Promise<JoinedRoomDto> {
    return this.repo.save(joinedRoomUser);
  }

  async findByUser(user: UserDto): Promise<JoinedRoomDto[]> {
    return this.repo.findBy({ user });
  }

  async findByRoom(room: RoomDto): Promise<JoinedRoom[]> {
    const joinedUsers = this.repo
      .createQueryBuilder('joinedUsers')
      .leftJoin('joinedUsers.room', 'room')
      .where('room.id = :roomId', { roomId: room.id })
      .getMany();
    // .leftJoin('joinedUsers.user', 'user')
    // .addSelect(['user.id', 'user.email', 'user.role', 'user.username'])

    return await joinedUsers;
  }

  async deleteBySocketId(socketId: string): Promise<DeleteResult> {
    return this.repo.delete({ socketId });
  }

  async deleteAll() {
    await this.repo.createQueryBuilder().delete().execute();
  }
}
