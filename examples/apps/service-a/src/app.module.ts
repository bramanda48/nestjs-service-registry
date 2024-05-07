import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceRegistryModule } from '@bramanda48/nestjs-service-registry';

@Module({
  imports: [
    ServiceRegistryModule.forRoot({
      mode: 'client',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
