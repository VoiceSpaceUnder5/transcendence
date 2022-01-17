import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UserModule } from './users/user.module';
import { channelsModule } from './chat-channels/channel.module';
import { channelUserModule } from './chat-channel-user/channel-user.module';
import { CodeService } from './code/code.service';
import { CodeModule } from './code/code.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { Channel } from './chat-channels/channel.entity';
import { ChannelUser } from './chat-channel-user/channel-user.entity';
import { Code } from './code/code.entity';
import { Message } from './message/message.entity';
import { ChatModule } from './chat/chat.module';
import { RelationModule } from './relation/relation.module';
import { ImageModule } from './image/image.module';
import { GameModule } from './game/game.module';
import { RecordModule } from './record/record.module';
import { Record } from './record/record.entity';
import { Relation } from './relation/relation.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.dev.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // docker-compose service 도메인으로 사용되나?
      port: 5432,
      username: 'kilee',
      password: 'kilee',
      database: 'test',
      entities: [User, Channel, ChannelUser, Code, Message, Record, Relation],
      autoLoadEntities: true,
      synchronize: true,
      // logging: true, // 타입 Orm 이 콘솔에 로그를 찍습니다.
    }), //
    GraphQLModule.forRoot({
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      cors: {
        origin: [process.env.FRONT_URI, process.env.ADMIN_URI], // 여기 코스설정 안해주면, 그래프큐엘(아폴로서버) 리스폰스에 access-control-allow-origin 에 에러남
        credentials: true,
      },
    }),
    channelUserModule,
    UserModule,
    channelsModule,
    CodeModule,
    MessageModule,
    AuthModule,
    ChatModule,
    RelationModule,
    ImageModule,
    GameModule,
    RecordModule,
  ],
  controllers: [AppController],
  providers: [AppService, CodeService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
