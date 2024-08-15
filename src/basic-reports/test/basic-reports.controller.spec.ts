import { Test, TestingModule } from '@nestjs/testing';
import { BasicReportsController } from '../basic-reports.controller';
import { BasicReportsService } from '../basic-reports.service';
import { Response } from 'express';
import { PrinterModule } from 'src/printer/printer.module';
import { DataaccessModule } from 'src/dataaccess/dataaccess.module';

describe('ReportsController', () => {
  let reportsController: BasicReportsController;
  let reportsService: BasicReportsService;

  const mockDoc = {
    pipe: jest.fn(),
    end: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasicReportsController],
      providers: [
        {
          provide: BasicReportsService,
          useValue: {
            createEmploymentLetter: jest.fn().mockResolvedValue(mockDoc),
          },
        },
      ],
      imports: [PrinterModule, DataaccessModule],
    }).compile();

    reportsController = module.get<BasicReportsController>(
      BasicReportsController,
    );
    reportsService = module.get<BasicReportsService>(BasicReportsService);
  });

  it('should return an array of reports', async () => {
    const responseMock = {
      setHeader: jest.fn(),
      pipe: jest.fn(),
      end: jest.fn(),
    } as any as Response;
    const employeeId = 1;
    await reportsController.getEmploymentLetter(responseMock, employeeId);
    expect(reportsService.createEmploymentLetter).toHaveBeenCalledWith(
      employeeId,
    );
    expect(responseMock.setHeader).toHaveBeenCalledWith(
      'Content-Type',
      'application/pdf',
    );
    expect(mockDoc.pipe).toHaveBeenCalled();
    expect(mockDoc.end).toHaveBeenCalled();
  });
});
