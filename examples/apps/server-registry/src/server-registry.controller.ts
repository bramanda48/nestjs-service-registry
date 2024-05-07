import { Controller, Get } from '@nestjs/common';
import { ServerRegistryService } from './server-registry.service';

@Controller()
export class ServerRegistryController {
  constructor(private readonly serviceRegistryService: ServerRegistryService) {}

  @Get()
  getHello(): object {
    return this.serviceRegistryService.getHello();
  }
}
