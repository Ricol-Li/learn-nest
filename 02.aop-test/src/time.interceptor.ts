import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 拦截器和中间件的区别在于，interceptor 可以拿到调用的 controller 和 handler
    // 它们都是 Nest AOP 思想的实现，但是 interceptor 更适合处理与具体业务相关的逻辑，而 middleware 适合更通用的处理逻辑。
    console.log(context.getClass(), context.getHandler());
    const startTime = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log('time: ', Date.now() - startTime);
      }),
    );
  }
}
