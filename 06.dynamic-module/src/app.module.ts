import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BbbModule } from './bbb/bbb.module';

@Module({
  imports: [
    BbbModule.register({
      name: '咖啡豆',
      age: '11Month',
      hobby: '喝neinei',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
