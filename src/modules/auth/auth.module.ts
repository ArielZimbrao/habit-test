import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/configuration/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ContextModule } from 'src/configuration/context/context.module';
import { JwtAuthGuard } from './jwt/jwt.auth.guard';
import { JWTStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_KEY'),
        signOptions: {
          expiresIn: configService.get('TOKEN_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({
      property: 'user',
    }),
    ContextModule,
  ],
  controllers: [AuthController],
  providers: [JwtAuthGuard, JWTStrategy, AuthService],
  exports: [],
})
export class AuthModule {}
