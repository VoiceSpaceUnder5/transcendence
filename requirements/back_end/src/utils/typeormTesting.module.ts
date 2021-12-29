import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatChannelUser } from 'src/chat-channel-user/chat-channel-user.entity';
import { ChatChannel } from 'src/chat-channels/chat-channel.entity';
import { Code } from 'src/code/code.entity';
import { Message } from 'src/message/message.entity';
import { User } from 'src/users/user.entity';

export const TypeOrmTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost', // docker-compose service 도메인으로 사용되나?
    port: 5432,
    username: 'kilee',
    password: 'kilee',
    database: 'test',
    // entities: ['dist/**/*.entity.js'],
    entities: [User, ChatChannel, ChatChannelUser, Code, Message],
    autoLoadEntities: true,
    synchronize: true,
    // logging: true,
  }),
  TypeOrmModule.forFeature([User, Code, ChatChannel, ChatChannelUser, Message]),
];
