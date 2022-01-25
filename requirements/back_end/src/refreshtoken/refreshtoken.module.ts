import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './refreshtoken.entity';
import { RefreshTokenService } from './refreshtoken.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken])],
  exports: [TypeOrmModule, RefreshTokenService],
  providers: [RefreshTokenService],
})
export class RefreshTokenModule {}
