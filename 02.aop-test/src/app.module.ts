import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogMiddleware } from './log.middleware';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE, APP_FILTER } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    // 为了调试拦截器，注释掉全局守卫
    {
      provide: APP_GUARD,
      useClass: LoginGuard, // 守卫
    },
    // 全局拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeInterceptor,
    },
    // 全局管道
    {
      provide: APP_PIPE,
      useClass: ValidatePipe,
    },
    // 全局过滤器
    {
      provide: APP_FILTER,
      useClass: TestFilter, // 守卫
    },
  ],
})
export class AppModule implements NestModule {
  // 全局中间件
  configure(consumer: MiddlewareConsumer) {
    // 在 configure 方法里配置 LogMiddleware 在哪些路由生效
    consumer.apply(LogMiddleware).forRoutes('/aaa');
  }
}
