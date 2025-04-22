import {
  Controller,
  Get,
  ParseIntPipe,
  ValidationPipe,
  Query,
  Param,
  HttpStatus,
  HttpException,
  Post,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaPipe, MyValidationPipe } from './aaa.pipe';
import { Ooo } from './dto/ooo.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(@Query('aa', ParseIntPipe) aa: string): string {
  //   return this.appService.getHello() + aa;
  // }

  @Get()
  getHello(
    @Query(
      'aa',
      new ParseIntPipe({
        // errorHttpStatusCode: HttpStatus.NOT_FOUND
        exceptionFactory: (msg) => {
          console.log(msg);
          throw new HttpException('msg' + msg, HttpStatus.NOT_IMPLEMENTED);
        },
      }),
    )
    aa: string,
  ): string {
    return this.appService.getHello() + aa;
  }

  @Get('nnn/:bbb')
  nnn(@Query('aaa', AaaPipe) aaa: string, @Param('bbb', AaaPipe) bbb: number) {
    return aaa + bbb;
  }

  @Post('ooo')
  ooo(@Body(new MyValidationPipe()) obj: Ooo) {
    console.log(obj);
    return 123;
  }
}
