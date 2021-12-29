import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatChannelUser } from './chat-channel-user.entity';
import { CreateChatChannelUserInput } from './inputs/create-chat-channel-user.input';

@Injectable()
export class ChatChannelUserService {
  constructor(
    @InjectRepository(ChatChannelUser)
    private readonly chatChannelUserRepository: Repository<ChatChannelUser>,
  ) {}

  findAll(): Promise<ChatChannelUser[]> {
    return this.chatChannelUserRepository.find();
  }

  async create(
    createchatChannelUserInput: CreateChatChannelUserInput,
  ): Promise<ChatChannelUser> {
    return this.chatChannelUserRepository.save(createchatChannelUserInput);
  }
}
