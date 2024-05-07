import { Module } from '@nestjs/common';
import { ServiceBController } from './service-b.controller';
import { ServiceBService } from './service-b.service';
import { ServiceRegistryModule } from '@bramanda48/nestjs-service-registry';

@Module({
  imports: [
    ServiceRegistryModule.forRoot({
      mode: 'client',
    }),
  ],
  controllers: [ServiceBController],
  providers: [ServiceBService],
})
export class ServiceBModule {}
