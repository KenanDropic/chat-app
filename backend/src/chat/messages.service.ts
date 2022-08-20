import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/pagination/dto/page-meta.dto';
import { PageOptionsDto } from 'src/pagination/dto/page-options.dto';
import { Repository } from 'typeorm';
import { MessageDto } from './dto/message.dto';
import { Message } from './entities/message.entity';
import { Room } from './entities/room.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly repo: Repository<Message>,
  ) {}

  async create(message: MessageDto): Promise<MessageDto> {
    return this.repo.save(message);
  }

  async findMessagesForRoom(room: Room, query: PageOptionsDto) {
    // TO DO
    const messagesForRoom = this.repo
      .createQueryBuilder('messages')
      .leftJoin('messages.room', 'room')
      .where('room.id = :roomId', { roomId: room.id })
      .leftJoinAndSelect('messages.user', 'user')
      .skip(query.skip)
      .take(query.take)
      .orderBy('messages.created_at', 'ASC');

    if (!messagesForRoom) throw new NotFoundException();

    const itemCount = await messagesForRoom.getCount();
    const { entities } = await messagesForRoom.getRawAndEntities();

    const pageMeta: PageMetaDto = new PageMetaDto({
      itemCount,
      query,
    });

    console.log('Entities:', entities);
  }
}
