import {
  BeforeApplicationShutdown,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CccService } from './ccc.service';
import { CccController } from './ccc.controller';

@Module({
  controllers: [CccController],
  providers: [CccService],
})
export class CccModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private moduleRef: ModuleRef) {}
  onModuleDestroy(): any {
    console.log('cccModule onModuleDestroy');
  }
  beforeApplicationShutdown(): any {
    console.log('cccModule beforeApplicationShutdown');
  }
  onApplicationShutdown() {
    const cccService = this.moduleRef.get<CccService>(CccService);
    console.log('------------------', cccService.findAll());

    console.log('cccModule onApplicationShutdown');
  }

  onModuleInit() {
    console.log('ccc module init');
  }
  onApplicationBootstrap() {
    console.log('ccc module bootstrap');
  }
}
