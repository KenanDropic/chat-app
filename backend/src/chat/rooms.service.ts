import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { PageMetaDto } from 'src/pagination/dto/page-meta.dto';
import { PageOptionsDto } from 'src/pagination/dto/page-options.dto';
import { PageDto } from 'src/pagination/dto/page.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { RoomDto } from './dto/room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private readonly repo: Repository<Room>,
  ) {}

  async createRoom(room: any, creator: UserDto): Promise<any> {
    const newRoom = {
      ...room,
      users: [creator],
    };
    // console.log('CREATOR', room, creator);
    return this.repo.save(newRoom);
  }

  async getUserRooms(
    userId: number,
    query: PageOptionsDto,
  ): Promise<PageDto<Room>> {
    const rooms = this.repo
      .createQueryBuilder('room')
      .leftJoin('room.users', 'user')
      .where('user.id = :userId', { userId })
      .skip(query.skip)
      .take(query.take)
      .orderBy('room.updated_at', 'DESC');

    if (!rooms) throw new NotFoundException();

    const itemCount = await rooms.getCount();
    const { entities } = await rooms.getRawAndEntities();

    // console.log('User room entities:', entities);

    const pageMeta: PageMetaDto = new PageMetaDto({
      itemCount,
      query,
    });

    return new PageDto(entities, pageMeta);
  }

  async addCreatorToRoom(room: RoomDto, creator: UserDto): Promise<RoomDto> {
    // console.log('CREATOR', room, creator);
    room.users.push(creator);
    return room;
  }
}
