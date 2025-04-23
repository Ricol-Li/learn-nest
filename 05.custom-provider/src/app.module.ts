import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    // 1. 简写的注入,使用class做token可以省去controller的@Inject()，比较简便
    // AppService,

    // 2. 完整写法
    // 通过 provide 指定 token，通过 useClass 指定对象的类，Nest 会自动对它做实例化后用来注入
    // {
    //   provide: AppService,
    //   useClass: AppService,
    // },

    // 3. 别名写法
    {
      provide: 'app_service',
      useClass: AppService,
    },

    // 4.除了指定class，还可以指定一个值，让IoC容器来注入
    {
      provide: 'person',
      useValue: {
        name: 'zhangsan',
        age: 18,
      },
    },

    // 5. 工厂方式注入值
    {
      provide: 'person2',
      useFactory: () => {
        return {
          name: 'lisi',
          age: 20,
        };
      },
    },

    // 6.useFactory 支持通过参数注入别的 provider
    {
      provide: 'person3',
      useFactory(person: { name: string }, appService: AppService) {
        console.log('person3注入');
        return {
          name: person.name,
          desc: appService.getHello(),
        };
      },
      inject: ['person', 'app_service'],
    },

    // 7. 异步注入
    {
      provide: 'person4',
      async useFactory() {
        await new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });
        console.log('person4注入, 会阻塞程序执行');
        return {
          name: 'bbb',
          desc: 'ccc',
        };
      },
    },
    // 8.别名注入
    {
      provide: 'person5',
      useExisting: 'person2',
    },
  ],
})
export class AppModule {}
