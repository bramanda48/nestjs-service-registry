import { Module } from '@nestjs/common';
import { ServiceRegistryController } from './service-registry.controller';
import { ServiceRegistryService } from './service-registry.service';

@Module({
  imports: [],
  controllers: [ServiceRegistryController],
  providers: [ServiceRegistryService],
})
export class ServiceRegistryModule {}
