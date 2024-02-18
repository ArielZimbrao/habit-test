import { Injectable } from '@nestjs/common';
import { FilterMessageDto } from './dto/filter-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import PageData from 'src/util/pagination.type';
import { MessageRepository } from 'src/configuration/database/repository/message.repository';
import { MessageEntity } from 'src/configuration/database/entities/message.entity';
import { Context } from 'src/configuration/context/context';
import { ApplicationRepository } from 'src/configuration/database/repository/application.repository';
import { UserRepository } from 'src/configuration/database/repository/user.repository';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly context: Context,
    private readonly applicationRepository: ApplicationRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(data: CreateMessageDto): Promise<MessageEntity> {
    const userContext = await this.context.getUser();

    const application = await this.applicationRepository.getApplicationByid(
      userContext.application_id,
    );

    const user = await this.userRepository.findOneById(userContext.id);
    const message = await this.messageRepository.save({
      text: data.text,
      active: true,
      application,
      user,
    } as any);
    return message;
  }

  async findAll(params: FilterMessageDto): Promise<PageData<MessageEntity>> {
    const data = await this.messageRepository.getAll(params);
    return new PageData<MessageEntity>(data[0], data[1], params.currentPage, params.numPerPage);
  }

  findOne(id: string): Promise<MessageEntity> {
    return this.messageRepository.findOneById(id);
  }

  async delete(id: string): Promise<void> {
    await this.messageRepository.delete(id);
  }
}
