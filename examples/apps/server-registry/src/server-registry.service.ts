import { Injectable } from '@nestjs/common';
import { ServiceRegistry } from '@bramanda48/nestjs-service-registry';

@Injectable()
export class ServerRegistryService {
  constructor(private readonly serviceRegistry: ServiceRegistry) {}
  getHello(): object {
    return this.serviceRegistry.GetServices();
  }
}
