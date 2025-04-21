import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  UseFilters,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Controller()
// @UseInterceptors(TimeInterceptor) // Controller界别拦截器
@UseFilters(TestFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('appController --- getHello Handler...');
    return this.appService.getHello();
  }

  @Get('aaa')
  @UseGuards(LoginGuard) // 局部路由守卫
  aaa(): string {
    console.log('appController --- aaa Handler...');
    return 'aaa';
  }

  @Get('bbb')
  @UseInterceptors(TimeInterceptor) // 单个拦截器
  bbb(): string {
    console.log('appController --- bbb Handler...');
    return 'bbb';
  }

  @Get('ccc')
  @UseFilters(TestFilter)
  ccc(@Query('num', ValidatePipe) num: number): number {
    console.log('appController --- ccc Handler...');
    return num + 1;
  }
}
