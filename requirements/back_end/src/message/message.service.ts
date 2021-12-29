import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}
  create(createMessageInput: CreateMessageInput): Promise<Message> {
    return this.messageRepository.save(createMessageInput);
  }

  findByChannelId(chatChannelId: number): Promise<Message[]> {
    return this.messageRepository.find({ chatChannelId });
  }
}
