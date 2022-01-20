import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from './refreshtoken.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshRepository: Repository<RefreshToken>,
  ) {}

  async create(userId: number, token: string): Promise<RefreshToken> {
    try {
      return await this.refreshRepository.save({ userId, token });
    } catch (e) {
      await this.refreshRepository.update({ userId }, { token });
      return this.findOneByUserId(userId);
    }
  }

  async findOne(id: string): Promise<RefreshToken> {
    return await this.refreshRepository.findOneOrFail({ id });
  }

  async findOneByUserId(userId: number): Promise<RefreshToken> {
    return await this.refreshRepository.findOneOrFail({ userId });
  }

  async delete(id: string): Promise<void> {
    await this.refreshRepository.delete(id);
  }
}
