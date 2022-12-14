import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/pagination/dto/page-meta.dto';
import { PageOptionsDto } from 'src/pagination/dto/page-options.dto';
import { PageDto } from 'src/pagination/dto/page.dto';
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

  async create(message: MessageDto) {
    return this.repo.save(message);
  }

  async findMessagesForRoom(room: Room, query: PageOptionsDto) {
    const messagesForRoom = this.repo
      .createQueryBuilder('messages')
      .leftJoin('messages.room', 'room')
      .where('room.id = :roomId', { roomId: room.id })
      .leftJoin('messages.user', 'user')
      .addSelect(['user.id', 'user.username', 'user.email', 'user.role'])
      .skip(query.skip)
      .take(query.take)
      .orderBy('messages.created_at', 'DESC');

    // poruke sortiram na osnovu datuma kreiranja ali u opadajućem nizu.

    if (!messagesForRoom) throw new NotFoundException();

    const itemCount = await messagesForRoom.getCount();
    const { entities } = await messagesForRoom.getRawAndEntities();

    const pageMeta: PageMetaDto = new PageMetaDto({
      itemCount,
      query,
    });

    return new PageDto(entities, pageMeta);
  }
}
