import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {
  JwtAccessStrategy,
  JwtTwoFactorStrategy,
} from './strategy/jwt.strategy';
import { FortyTwoStrategy } from './strategy/fortytwo.strategy';
import { ConfigModule } from '@nestjs/config';
import { CodeModule } from 'src/code/code.module';
import { RefreshTokenModule } from 'src/refreshtoken/refreshtoken.module';
import { EncryptModule } from 'src/encrypt/encrypt.module';

@Module({
  imports: [
    UserModule,
    CodeModule,
    PassportModule,
    ConfigModule,
    RefreshTokenModule,
    JwtModule.register({}),
    EncryptModule,
  ],
  providers: [
    AuthService,
    JwtAccessStrategy,
    JwtTwoFactorStrategy,
    FortyTwoStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
