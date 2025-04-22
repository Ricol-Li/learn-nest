import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

// 拦截什么异常用 @Catch 装饰器来声明，然后在 catch 方法返回对应的响应，给用户更友好的提示
@Catch(BadRequestException)
export class TestFilter implements ExceptionFilter {
  // 实现 ExceptionFilter 接口，实现 catch 方法，就可以拦截异常了
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();

    response.status(400).json({
      statusCode: 400,
      message: 'test-filter: ' + exception.message,
    });
  }
}
