import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { FilterUserDto } from 'src/modules/user/dto/filter-user.dto';

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

  async getAll(params: FilterUserDto): Promise<[UserEntity[], number]> {
    const query = this.repo
      .createQueryBuilder('user')
      .andWhere('user.actived = :actived', { actived: true });

    if (params.name) {
      query.andWhere('user.name like :name', { name: `%${params.name}%` });
    }

    if (params.email) {
      query.andWhere('user.email like :email', { email: `%${params.email}%` });
    }

    if (params.applicationId) {
      query.andWhere('user.application_id = :applicationId', {
        applicationId: params.applicationId,
      });
    }
    return query
      .limit(params.numPerPage || 10)
      .offset(((params.currentPage || 1) - 1) * (params.numPerPage || 10))
      .getManyAndCount();
  }

  async findOneById(userId: string, application_id?: string): Promise<UserEntity> {
    const query = this.repo
      .createQueryBuilder('user')
      .andWhere('user.actived = :actived', { actived: true });

    if (application_id) {
      query.andWhere('user.application_id = :application_id', { application_id });
    }
    return query.andWhere('user.id = :id', { id: userId }).getOne();
  }

  async delete(id: string): Promise<void> {
    await this.repo.update(id, { actived: false });
  }
}
