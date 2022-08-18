import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async createRoom(roomData: any, creator: User): Promise<any> {
    const user = {
      ...creator,
    };
    delete user.password;
    delete user.hashedRT;

    const room = {
      ...roomData,
    };
    room.users.push(user);

    return this.repo.save(room);
  }

  async getUserRooms(
    userId: number,
    query: PageOptionsDto,
  ): Promise<PageDto<Room>> {
    const rooms = this.repo
      .createQueryBuilder('rooms')
      .leftJoinAndSelect('rooms.users', 'user')
      .where('user.id = :userId', { userId })
      .skip(query.skip)
      .take(query.take)
      .orderBy('rooms.updated_at', 'DESC');

    if (!rooms) throw new NotFoundException();

    const itemCount = await rooms.getCount();
    const { entities } = await rooms.getRawAndEntities();

    const pageMeta: PageMetaDto = new PageMetaDto({
      itemCount,
      query,
    });

    // remove password and rt from response.
    // TO DO - Maybe integrate somehow with interceptor?!
    entities.map((entity) => {
      entity.users.map((u) => {
        delete u.password;
        delete u.hashedRT;
      });
    });

    return new PageDto(entities, pageMeta);
  }

  async addCreatorToRoom(room: RoomDto, creator: UserDto): Promise<RoomDto> {
    // console.log('CREATOR', room, creator);
    room.users.push(creator);
    return room;
  }
}
