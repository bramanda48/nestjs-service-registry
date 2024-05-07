import { Test, TestingModule } from '@nestjs/testing';
import { ServiceBController } from './service-b.controller';
import { ServiceBService } from './service-b.service';

describe('ServiceBController', () => {
  let serviceBController: ServiceBController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceBController],
      providers: [ServiceBService],
    }).compile();

    serviceBController = app.get<ServiceBController>(ServiceBController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceBController.getHello()).toBe('Hello World!');
    });
  });
});
