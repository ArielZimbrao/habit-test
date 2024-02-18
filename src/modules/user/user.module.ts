import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/configuration/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ContextModule } from 'src/configuration/context/context.module';

@Module({
  imports: [DatabaseModule, AuthModule, ContextModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
