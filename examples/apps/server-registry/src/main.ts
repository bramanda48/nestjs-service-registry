import { NestFactory } from '@nestjs/core';
import { ServerRegistryModule } from './server-registry.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerRegistryModule);
  await app.listen(3000);
}
bootstrap();
