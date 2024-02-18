import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ApplicationEntity } from '../entities/application.entity';

@Injectable()
export class ApplicationRepository {
  constructor(
    @Inject('APPLICATION_REPOSITORY')
    private readonly repo: Repository<ApplicationEntity>,
  ) {}

  async save(data: ApplicationEntity): Promise<ApplicationEntity> {
    return this.repo.save(data);
  }

  getApplicationByid(id: string): Promise<ApplicationEntity> {
    return this.repo.findOne({
      where: {
        id: id,
      },
    });
  }
}
