import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly repo: Repository<UserEntity>,
  ) {}

  async save(data: UserEntity): Promise<UserEntity> {
    return this.repo.save(data);
  }

  async findActiveUserEmail(email: string): Promise<UserEntity> {
    return this.repo.findOne({
      where: {
        email: email,
        actived: true,
      },
      relations: ['application'],
    });
  }
}
