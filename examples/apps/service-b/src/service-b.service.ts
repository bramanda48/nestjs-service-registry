import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceBService {
  getHello(): string {
    return 'Hello World!';
  }
}
