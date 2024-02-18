import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { DatabaseModule } from 'src/configuration/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ContextModule } from 'src/configuration/context/context.module';

@Module({
  imports: [DatabaseModule, AuthModule, ContextModule],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [],
})
export class ApplicationModule {}
