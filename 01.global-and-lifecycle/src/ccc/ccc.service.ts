import {
  BeforeApplicationShutdown,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { CreateCccDto } from './dto/create-ccc.dto';
import { UpdateCccDto } from './dto/update-ccc.dto';

@Injectable()
export class CccService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleDestroy(): any {
    console.log('cccService onModuleDestroy');
  }
  beforeApplicationShutdown(signal?: string): any {
    console.log('cccService beforeApplicationShutdown', signal);
  }
  onApplicationShutdown(signal?: string): any {
    console.log('cccService onApplicationShutdown', signal);
  }

  constructor() {
    console.log('ccc service constructor');
  }
  onModuleInit() {
    console.log('ccc service onModuleInit');
  }
  onApplicationBootstrap() {
    console.log('ccc service onApplicationBootstrap');
  }
  create(createCccDto: CreateCccDto) {
    return 'This action adds a new ccc';
  }

  findAll() {
    return `This action returns all ccc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ccc`;
  }

  update(id: number, updateCccDto: UpdateCccDto) {
    return `This action updates a #${id} ccc`;
  }

  remove(id: number) {
    return `This action removes a #${id} ccc`;
  }
}
