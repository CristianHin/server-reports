import { Test, TestingModule } from '@nestjs/testing';
import { BasicReportsService } from '../basic-reports.service';
import { PrinterService } from 'src/printer/printer.service';
import { DataaccessService } from 'src/dataaccess/dataaccess.service';
import { NotFoundException } from '@nestjs/common';

describe('BasicReportsService', () => {
  let service: BasicReportsService;
  let printerService: PrinterService;
  let dataAccessService: DataaccessService;

  const mockPrinterService = {
    createPdf: jest.fn(),
  };

  const mockDataAccessService = {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    employees: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BasicReportsService,
        { provide: PrinterService, useValue: mockPrinterService },
        { provide: DataaccessService, useValue: mockDataAccessService },
      ],
    }).compile();

    service = module.get<BasicReportsService>(BasicReportsService);
    printerService = module.get<PrinterService>(PrinterService);
    dataAccessService = module.get<DataaccessService>(DataaccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('report-service', () => {
    it('should call createPdf with the correct user id', async () => {
      const employee = { id: 1, name: 'John Doe' };
      mockDataAccessService.employees.findUnique.mockResolvedValueOnce(
        employee,
      );
      await service.createEmploymentLetter(employee.id);
      expect(mockPrinterService.createPdf).toHaveBeenCalled();
    });

    it('should error to call createPdf with the incorrect user id', async () => {
      const employee = null;
      mockDataAccessService.employees.findUnique.mockResolvedValueOnce(
        employee,
      );
      await expect(service.createEmploymentLetter(1)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
