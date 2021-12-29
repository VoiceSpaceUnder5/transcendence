import { Test, TestingModule } from '@nestjs/testing';
import { CodeModule } from 'src/code/code.module';
import { TypeOrmTestingModule } from 'src/utils/typeormTesting.module';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('Users Resolver', () => {
  let usersResolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule(), CodeModule],
      providers: [UsersResolver, UsersService],
    }).compile();

    usersResolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(usersResolver).toBeDefined();
  });
});
