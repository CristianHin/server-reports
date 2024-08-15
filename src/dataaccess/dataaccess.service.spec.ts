import { Test, TestingModule } from '@nestjs/testing';
import { DataaccessService } from './dataaccess.service';

describe('DataaccessService', () => {
  let service: DataaccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataaccessService],
    }).compile();

    service = module.get<DataaccessService>(DataaccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
