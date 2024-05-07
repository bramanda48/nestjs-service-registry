import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceRegistryService {
  getHello(): string {
    return 'Hello World!';
  }
}
