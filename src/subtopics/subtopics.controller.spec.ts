import { Test, TestingModule } from '@nestjs/testing';
import { SubtopicsController } from './subtopics.controller';

describe('SubtopicsController', () => {
  let controller: SubtopicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubtopicsController],
    }).compile();

    controller = module.get<SubtopicsController>(SubtopicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
