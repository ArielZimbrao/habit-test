import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ApplicationEntity } from '../entities/application.entity';
import { FilterApplicationDto } from 'src/modules/application/dto/filter-application.dto';

@Injectable()
export class ApplicationRepository {
  constructor(
    @Inject('APPLICATION_REPOSITORY')
    private readonly repo: Repository<ApplicationEntity>,
  ) {}

  async save(data: ApplicationEntity): Promise<ApplicationEntity> {
    return this.repo.save(data);
  }

  getApplicationByid(applicationId: string): Promise<ApplicationEntity> {
    const query = this.repo
      .createQueryBuilder('application')
      .andWhere('application.actived = :actived', { actived: true });

    return query.andWhere('application.id = :id', { id: applicationId }).getOne();
  }

  getApplicationByName(name: string): Promise<ApplicationEntity> {
    return this.repo.findOne({
      where: {
        name: name,
      },
    });
  }

  async getAll(params: FilterApplicationDto): Promise<[ApplicationEntity[], number]> {
    const query = this.repo
      .createQueryBuilder('application')
      .andWhere('application.actived = :actived', { actived: true });

    if (params.name) {
      query.andWhere('application.name like :name', { name: `%${params.name}%` });
    }

    return query
      .limit(params.numPerPage || 10)
      .offset(((params.currentPage || 1) - 1) * (params.numPerPage || 10))
      .getManyAndCount();
  }
}
