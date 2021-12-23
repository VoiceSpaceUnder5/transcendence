import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatChannelUser } from './chat-channel-user.entity';

@Injectable()
export class ChatChannelUserService {
  constructor(
    @InjectRepository(ChatChannelUser)
    private readonly chatChannelUserRepository: Repository<ChatChannelUser>,
  ) {}

  findAll(): Promise<ChatChannelUser[]> {
    return this.chatChannelUserRepository.find();
  }
}
