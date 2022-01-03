import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatChannelUser } from './chat-channel-user.entity';
import { CreateChatChannelUserInput } from './inputs/create-chat-channel-user.input';
import { DeleteChatChannelUserInput } from './inputs/delete-chat-channel-user.input';

@Injectable()
export class ChatChannelUserService {
  constructor(
    @InjectRepository(ChatChannelUser)
    private readonly chatChannelUserRepository: Repository<ChatChannelUser>,
  ) {}

  findAll(): Promise<ChatChannelUser[]> {
    return this.chatChannelUserRepository.find();
  }

  findByUserId(userId: number): Promise<ChatChannelUser[]> {
    return this.chatChannelUserRepository.find({ userId });
  }

  findByChannelId(chatChannelId: number): Promise<ChatChannelUser[]> {
    return this.chatChannelUserRepository.find({ chatChannelId });
  }

  async create(
    createchatChannelUserInput: CreateChatChannelUserInput,
  ): Promise<ChatChannelUser> {
    return this.chatChannelUserRepository.save(createchatChannelUserInput);
  }

  async delete(deleteChatChannelUser: DeleteChatChannelUserInput) {
    const result = await this.chatChannelUserRepository.delete(
      deleteChatChannelUser,
    );
    //삭제 성공 시 true, 삭제 실패 시 false
    return result.affected;
  }
}
