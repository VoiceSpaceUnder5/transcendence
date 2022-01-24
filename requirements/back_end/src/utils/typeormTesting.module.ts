import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelUser } from 'src/chat-channel-user/channel-user.entity';
import { Channel } from 'src/chat-channels/channel.entity';
import { Code } from 'src/code/code.entity';
import { Message } from 'src/message/message.entity';
import { User } from 'src/users/user.entity';

export const TypeOrmTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'under5.ngrok.io', // docker-compose service 도메인으로 사용되나?
    port: 5432,
    username: 'kilee',
    password: 'kilee',
    database: 'test',
    // entities: ['dist/**/*.entity.js'],
    entities: [User, Channel, ChannelUser, Code, Message],
    autoLoadEntities: true,
    synchronize: true,
    // logging: true,
  }),
  TypeOrmModule.forFeature([User, Code, Channel, ChannelUser, Message]),
];
