import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { ChatChannelsModule } from './chat-channels/chat-channels.module';
import { ChatChannelUserModule } from './chat-channel-user/chat-channel-user.module';
import { CodeService } from './code/code.service';
import { CodeModule } from './code/code.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { ChatChannel } from './chat-channels/chat-channel.entity';
import { ChatChannelUser } from './chat-channel-user/chat-channel-user.entity';
import { Code } from './code/code.entity';
import { Message } from './message/message.entity';

// TypeOrmModule.forRootAsync({
//   useFactory: async () =>
//     Object.assign(await getConnectionOptions(), {
//       autoLoadEntities: true, // true 이면 엔티티가 자동으로 로드됩니다. (기본 false)
//     }),
// });

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.dev.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db', // docker-compose service 도메인으로 사용되나?
      port: 5432,
      username: 'kilee',
      password: 'kilee',
      database: 'test',
      // entities: ['dist/**/*.entity.js'],
      entities: [User, ChatChannel, ChatChannelUser, Code, Message],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }), //
    GraphQLModule.forRoot({
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      // autoSchemaFile: true,
    }),
    UsersModule,
    ChatChannelsModule,
    ChatChannelUserModule,
    CodeModule,
    MessageModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, CodeService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
