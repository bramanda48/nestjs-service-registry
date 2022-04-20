import { DynamicModule, Logger, Module, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ServiceRegistryController } from './service-registry.controller';
import { ServiceRegistry } from './service-registry.service';
import { isEmpty } from './utils';

@Module({})
export class ServiceRegistryModule implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown {
    public static mode: 'client'|'server' = 'server';
    private readonly logger: Logger = new Logger(ServiceRegistryModule.name);

    static forRoot(config?: {
        mode: 'client'|'server'
    }): DynamicModule {
        let controller = [];
        if(!isEmpty(config) && !isEmpty(config.mode)) {
            this.mode = config.mode;
        }
        if(this.mode == 'server') {
            controller.push(ServiceRegistryController);
        }
        return {
            global: true,
            module: ServiceRegistryModule,
            controllers: controller,
            providers: [ServiceRegistry],
            exports: [ServiceRegistry],
        };
    }

    onModuleInit() {
        if(ServiceRegistryModule.mode == 'client') {
            ServiceRegistry.setServiceId();
        }
    }

    onModuleDestroy() {
        if(ServiceRegistryModule.mode == 'client') {
            // Unregister service
            ServiceRegistry.unregister();
        }
    }

    onApplicationShutdown() {
        if(ServiceRegistryModule.mode == 'client') {
            // Unregister service
            ServiceRegistry.unregister();
        }
    }
}