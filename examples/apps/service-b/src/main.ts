import { NestFactory } from '@nestjs/core';
import { ServiceBModule } from './service-b.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceBModule);
  await app.listen(3000);
}
bootstrap();
