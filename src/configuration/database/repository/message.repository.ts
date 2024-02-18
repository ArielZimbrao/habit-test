import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MessageEntity } from '../entities/message.entity';
import { FilterMessageDto } from 'src/modules/message/dto/filter-message.dto';

@Injectable()
export class MessageRepository {
  constructor(
    @Inject('MESSAGE_REPOSITORY')
    private readonly repo: Repository<MessageEntity>,
  ) {}

  async save(data: MessageEntity): Promise<MessageEntity> {
    return this.repo.save(data);
  }

  async getAll(params: FilterMessageDto): Promise<[MessageEntity[], number]> {
    const query = this.repo
      .createQueryBuilder('message')
      .andWhere('message.actived = :actived', { actived: true });

    if (params.applicationId) {
      query.andWhere('user.application_id = :applicationId', {
        applicationId: params.applicationId,
      });
    }

    if (params.userId) {
      query.andWhere('user.user_id = :userId', {
        userId: params.userId,
      });
    }
    return query
      .limit(params.numPerPage || 10)
      .offset(((params.currentPage || 1) - 1) * (params.numPerPage || 10))
      .getManyAndCount();
  }

  async findOneById(messageId: string): Promise<MessageEntity> {
    const query = this.repo
      .createQueryBuilder('message')
      .andWhere('message.actived = :actived', { actived: true });

    return query.andWhere('message.id = :id', { id: messageId }).getOne();
  }

  async delete(id: string): Promise<void> {
    await this.repo.update(id, { actived: false });
  }
}
