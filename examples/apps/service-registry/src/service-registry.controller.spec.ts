import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRegistryController } from './service-registry.controller';
import { ServiceRegistryService } from './service-registry.service';

describe('ServiceRegistryController', () => {
  let serviceRegistryController: ServiceRegistryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceRegistryController],
      providers: [ServiceRegistryService],
    }).compile();

    serviceRegistryController = app.get<ServiceRegistryController>(ServiceRegistryController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceRegistryController.getHello()).toBe('Hello World!');
    });
  });
});
