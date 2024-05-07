import { NestFactory } from '@nestjs/core';
import { ServiceBModule } from './service-b.module';
import { ServiceRegistry } from '@bramanda48/nestjs-service-registry';

async function bootstrap() {
  const app = await NestFactory.create(ServiceBModule);
  await app.listen(3002);

  ServiceRegistry.register(app, {
    serviceName: 'service-b',
    registryServer: 'http://localhost:3000',
    host: 'http://127.0.0.1:3001',
  });
}
bootstrap();
