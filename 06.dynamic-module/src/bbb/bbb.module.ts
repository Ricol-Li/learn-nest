import { DynamicModule, Module } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';

// 1. 静态模块
// @Module({
//   controllers: [BbbController],
//   providers: [BbbService],
// })
// export class BbbModule {}

/**
 * * 动态模块
 */
@Module({})
export class BbbModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: BbbModule,
      controllers: [BbbController],
      providers: [
        BbbService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
      ],
      exports: [],
    };
  }
}
