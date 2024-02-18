import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { DatabaseModule } from 'src/configuration/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ContextModule } from 'src/configuration/context/context.module';

@Module({
  imports: [DatabaseModule, AuthModule, ContextModule],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [],
})
export class MessageModule {}
