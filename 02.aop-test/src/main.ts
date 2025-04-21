import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';
import { LoginGuard } from './login.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局中间件
  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('global middleware -- before', req.url);
    next();
    console.log('global middleware -- after');
  });

  // 全局守卫
  app.useGlobalGuards(new LoginGuard()); // 这是全局守卫，所有路由都会经过，还有另外一种写法，是写在AppModule里
  // 全局拦截器
  app.useGlobalInterceptors(new TimeInterceptor());
  // 全局管道
  app.useGlobalPipes(new ValidatePipe());
  // 全局过滤器
  app.useGlobalFilters(new TestFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
