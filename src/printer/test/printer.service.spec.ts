import { Test, TestingModule } from '@nestjs/testing';
import { PrinterService } from '../printer.service';
import PdfPrinter from 'pdfmake';
import type { TDocumentDefinitions, BufferOptions } from 'pdfmake/interfaces';

jest.mock('pdfmake');

describe('PrinterService', () => {
  let service: PrinterService;
  let mockCreatePdfKitDocument: jest.Mock;

  beforeEach(async () => {
    mockCreatePdfKitDocument = jest.fn();
    (PdfPrinter as jest.Mock).mockImplementation(() => ({
      createPdfKitDocument: mockCreatePdfKitDocument,
    }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [PrinterService],
    }).compile();

    service = module.get<PrinterService>(PrinterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call createPdfKitDocument with document definition and options', () => {
    const docDefinition: TDocumentDefinitions = {
      content: ['This is a test PDF'],
    };
    service.createPdf(docDefinition);
    expect(mockCreatePdfKitDocument).toHaveBeenCalled();
  });

  it('should return the created PDF document', () => {
    const docDefinition: TDocumentDefinitions = {
      content: ['Another test PDF'],
    };
    const options: BufferOptions = {};
    const mockPdfDocument = {};
    mockCreatePdfKitDocument.mockReturnValueOnce(mockPdfDocument);
    const result = service.createPdf(docDefinition, options);
    expect(result).toBe(mockPdfDocument);
  });
});