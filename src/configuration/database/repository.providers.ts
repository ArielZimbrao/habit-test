import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ApplicationEntity } from './entities/application.entity';
export const propositoryProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'APPLICATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ApplicationEntity),
    inject: ['DATA_SOURCE'],
  },
];
