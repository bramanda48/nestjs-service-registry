import { Module } from '@nestjs/common';
import { ServerRegistryController } from './server-registry.controller';
import { ServerRegistryService } from './server-registry.service';
import { ServiceRegistryModule } from '@bramanda48/nestjs-service-registry';

@Module({
  imports: [
    ServiceRegistryModule.forRoot({
      mode: 'server',
    }),
  ],
  controllers: [ServerRegistryController],
  providers: [ServerRegistryService],
})
export class ServerRegistryModule {}
