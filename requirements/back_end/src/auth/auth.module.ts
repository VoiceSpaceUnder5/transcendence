import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './jwt.strategy';
import { FortyTwoStrategy } from './fortytwo.strategy';
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
  providers: [AuthService, LocalStrategy, JwtAccessStrategy, FortyTwoStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
