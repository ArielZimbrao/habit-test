import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ApplicationModule } from './modules/application/application.module';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [AuthModule, UserModule, ApplicationModule, MessageModule],
})
export class AppModule {}
