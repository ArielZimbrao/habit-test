import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { UserRepository } from './repository/user.repository';
import { ConfigModule } from '@nestjs/config';
import { propositoryProviders } from './repository.providers';
import { ApplicationRepository } from './repository/application.repository';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [...databaseProviders, ...propositoryProviders, UserRepository, ApplicationRepository],
  exports: [...databaseProviders, ...propositoryProviders, UserRepository, ApplicationRepository],
})
export class DatabaseModule {}
