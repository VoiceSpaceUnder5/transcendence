import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategy/jwt.strategy';
import { FortyTwoStrategy } from './strategy/fortytwo.strategy';
import { ConfigModule } from '@nestjs/config';
import { CodeModule } from 'src/code/code.module';

@Module({
  imports: [
    UsersModule,
    CodeModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({}),
  ],
  providers: [AuthService, JwtAccessStrategy, FortyTwoStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
