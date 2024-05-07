import { Controller, Get } from '@nestjs/common';
import { ServiceBService } from './service-b.service';

@Controller()
export class ServiceBController {
  constructor(private readonly serviceBService: ServiceBService) {}

  @Get()
  getHello(): string {
    return this.serviceBService.getHello();
  }
}
