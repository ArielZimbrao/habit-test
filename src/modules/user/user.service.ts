import { Injectable } from '@nestjs/common';
import { FilterUserDto } from './dto/filter-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { cryptoUtils } from 'src/util/crypto.utils';
import PageData from 'src/util/pagination.type';
import { UserRepository } from 'src/configuration/database/repository/user.repository';
import { UserEntity } from 'src/configuration/database/entities/user.entity';
import { ApplicationRepository } from 'src/configuration/database/repository/application.repository';
import { ApplicationNotFoundError, UserAlreadyExistsError } from 'src/exception/exception';
import { RoleUserEnum } from 'src/util/enum/role.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly applicationRepository: ApplicationRepository,
  ) {}

  async create(data: CreateUserDto): Promise<UserEntity> {
    const olduser = await this.userRepository.findActiveUserEmail(data.email);

    if (olduser) {
      throw new UserAlreadyExistsError();
    }

    let application = null;
    if (data.role === RoleUserEnum.USER) {
      application = await this.applicationRepository.getApplicationByid(data.applicationId);

      if (!application) {
        throw new ApplicationNotFoundError();
      }
    }

    const user = await this.userRepository.save({
      email: data.email,
      name: data.name,
      role: RoleUserEnum[data.role] || RoleUserEnum.USER,
      password: await cryptoUtils.preSavePassword(data.password),
      active: true,
      application,
    } as any);
    return user;
  }
  async findAll(params: FilterUserDto): Promise<PageData<UserEntity>> {
    const data = await this.userRepository.getAll(params);
    return new PageData<UserEntity>(data[0], data[1], params.currentPage, params.numPerPage);
  }
  findOne(id: string, application_id?: string): Promise<UserEntity> {
    return this.userRepository.findOneById(id, application_id);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
