import { Injectable } from '@nestjs/common';
import { FilterApplicationDto } from './dto/filter-application.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import PageData from 'src/util/pagination.type';
import { ApplicationRepository } from 'src/configuration/database/repository/application.repository';
import { ApplicationEntity } from 'src/configuration/database/entities/application.entity';
import { ApplicationAlreadyExistsError } from 'src/exception/exception';

@Injectable()
export class ApplicationService {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async create(data: CreateApplicationDto): Promise<ApplicationEntity> {
    const oldApplication = await this.applicationRepository.getApplicationByName(data.name);
    if (oldApplication) {
      throw new ApplicationAlreadyExistsError();
    }

    const application = await this.applicationRepository.save({
      name: data.name,
      active: true,
    } as any);
    return application;
  }

  async findAll(params: FilterApplicationDto): Promise<PageData<ApplicationEntity>> {
    const data = await this.applicationRepository.getAll(params);
    return new PageData<ApplicationEntity>(data[0], data[1], params.currentPage, params.numPerPage);
  }

  findOne(id: string): Promise<ApplicationEntity> {
    return this.applicationRepository.getApplicationByid(id);
  }
}
