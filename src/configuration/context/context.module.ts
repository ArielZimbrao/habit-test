import { Module } from '@nestjs/common';
import { Context } from './context';
import { ContextInterceptor } from './context-interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [
    ContextInterceptor,
    Context,
    {
      provide: APP_INTERCEPTOR,
      useClass: ContextInterceptor,
    },
  ],
  exports: [Context],
})
export class ContextModule {}
