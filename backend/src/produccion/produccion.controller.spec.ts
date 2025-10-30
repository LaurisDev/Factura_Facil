import { Test, TestingModule } from '@nestjs/testing';
import { ProduccionController } from './produccion.controller';
import { ProduccionService } from './produccion.service';

describe('ProduccionController', () => {
  let controller: ProduccionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProduccionController],
      providers: [ProduccionService],
    }).compile();

    controller = module.get<ProduccionController>(ProduccionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
