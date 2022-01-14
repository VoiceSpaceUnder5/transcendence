import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  create(createMessageInput: CreateMessageInput): Promise<Message> {
    return this.messageRepository.save(createMessageInput);
  }

  findByChannelId(channelId: number): Promise<Message[]> {
    return this.messageRepository.find({ channelId });
  }
}
