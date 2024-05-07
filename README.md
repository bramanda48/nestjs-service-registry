<a name="readme-top"></a>

<div align="center">
  <a href="https://github.com/bramanda48/nestjs-service-registry">
    <img src="https://cdn.worldvectorlogo.com/logos/nestjs.svg" alt="Supervisord" width="150px">
  </a>
  <h2 align="center">@bramanda48/nestjs-service-registry</h2>
  <div align="center">
    <p align="center">My Simple Service Registry for NestJS</p>
    <div>
        <a href="https://github.com/bramanda48/nestjs-service-registry/releases/"><img src="https://img.shields.io/github/release/bramanda48/nestjs-service-registry?include_prereleases=&sort=semver&color=blue" alt="GitHub release"></a>
        <a href="https://github.com/bramanda48/nestjs-service-registry#license"><img src="https://img.shields.io/badge/License-MIT-blue" alt="License"></a>
    </div>
  </div>
</div>

## Installation & Usage

To see how to use this library, you can refer to the examples folder or follow these instructions.

#### Install @bramanda48/nestjs-service-registry using npm:

```bash
npm install --save @bramanda48/nestjs-service-registry
```

#### Install @bramanda48/nestjs-service-registry using yarn:

```bash
yarn add @bramanda48/nestjs-service-registry
```

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

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Releasing

1. Change package version using `yarn version --new-version <new version>`
2. Publish to npmjs `yarn publish --access public`

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/bramanda48/nestjs-service-registry/blob/master/LICENSE.md) file for details.
