import { NestFactory } from '@nestjs/core';
import { ServiceRegistryModule } from './service-registry.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceRegistryModule);
  await app.listen(3000);
}
bootstrap();
