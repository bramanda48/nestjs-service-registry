import { Controller, Get } from '@nestjs/common';
import { ServiceRegistryService } from './service-registry.service';

@Controller()
export class ServiceRegistryController {
  constructor(private readonly serviceRegistryService: ServiceRegistryService) {}

  @Get()
  getHello(): string {
    return this.serviceRegistryService.getHello();
  }
}
