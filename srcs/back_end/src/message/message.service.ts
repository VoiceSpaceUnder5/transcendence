import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelUserService } from 'src/chat-channel-user/channel-user.service';
import { Repository } from 'typeorm';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly channelUserService: ChannelUserService,
  ) {}

  findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  async create(createMessageInput: CreateMessageInput): Promise<Message> {
    const { userId, channelId } = createMessageInput;
    const channelUser = await this.channelUserService.findByPK({
      userId,
      channelId,
    });
    if (!channelUser) throw new BadRequestException('deleted-channel');
    if (channelUser.roleId === 'UR3')
      throw new BadRequestException('banned-user');
    if (channelUser.roleId === 'UR4')
      throw new BadRequestException('muted-user');
    return this.messageRepository.save(createMessageInput);
  }

  findByChannelId(channelId: string): Promise<Message[]> {
    return this.messageRepository.find({ channelId });
  }
}
