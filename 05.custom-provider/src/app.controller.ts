import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 1.在 AppController 的构造器里参数里声明了 AppService 的依赖，就会自动注入
  // constructor(private readonly appService: AppService) {}

  // 2.如果不想用构造器注入，也可以属性注入
  // @Inject(AppService)
  // private readonly appService: AppService;

  // 3. 别名注入
  @Inject('app_service')
  private readonly appService: AppService;

  // 4. 注入一个特定的值
  @Inject('person')
  private readonly person: { name: string; age: number };
  // 5. 工厂方式注入
  @Inject('person2')
  private readonly person2: { name: string; age: number };

  // 6. 工厂方式注入别的provide
  @Inject('person3')
  private readonly person3: { name: string; desc: string };

  // 7. 异步注入
  @Inject('person4')
  private readonly person4: { name: string; age: number };

  // 8. 别名注入
  @Inject('person5')
  private readonly person5: { name: string; age: number };

  @Get()
  getHello(): string {
    console.log('person', this.person);
    console.log('person2', this.person2);
    console.log('person3', this.person3);
    console.log('person4', this.person4);
    console.log('person5', this.person5);
    return this.appService.getHello();
  }
}
