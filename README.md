<h1>Nestjs Simple Service Registry</h1>

## Install
```bash
$ npm install @bramanda48/nestjs-service-registry
```

## Usage
### Server
1. Add `ServiceRegistryModule` in your main module
```ts
ServiceRegistryModule.forRoot({
    mode: 'server'
});
```
Example :
```ts
import { ServiceRegistryModule } from '@bramanda48/nestjs-service-registry';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
      ServiceRegistryModule.forRoot({
          mode: 'server'
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Client
1. Add `ServiceRegistryModule` in your main module 
```ts
ServiceRegistryModule.forRoot({
    mode: 'client'
});
```
2. Register your service to registry server
```ts
ServiceRegistry.register(app, {
    serviceName: 'Service name',
    registryServer: 'Registry server url',
    host: `Your client host`
});
```
Example:
```ts
import { ServiceRegistry } from '@bramanda48/nestjs-service-registry';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(1000);

  ServiceRegistry.register(app, {
      serviceName: 'service-a',
      registryServer: 'http://localhost:3000',
      host: 'http://127.0.0.1:1000'
  });
}
bootstrap();
```
3. To get service data use method `GetSevice`
```ts
this.serviceRegistry.GetService('Service name');
```
Example :
```ts
this.serviceRegistry.GetService('service-a');
```
