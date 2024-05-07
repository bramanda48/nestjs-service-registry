import { Test, TestingModule } from '@nestjs/testing';
import { ServerRegistryController } from './server-registry.controller';
import { ServerRegistryService } from './server-registry.service';

describe('ServerRegistryController', () => {
  let serviceRegistryController: ServerRegistryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServerRegistryController],
      providers: [ServerRegistryService],
    }).compile();

    serviceRegistryController = app.get<ServerRegistryController>(
      ServerRegistryController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceRegistryController.getHello()).toBe('Hello World!');
    });
  });
});
