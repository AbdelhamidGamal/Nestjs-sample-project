import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Serialize } from './interceptors/serialize.interceptor';
import { currentUser } from './users/decorators/current-user.decorator';
import { UserDto } from './users/dtos/user.dto';

@Serialize(UserDto)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@currentUser() user: any): string {
    return this.appService.getHello();
  }
}
