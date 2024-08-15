import { Injectable } from '@nestjs/common';

import PdfPrinter from 'pdfmake';
import type { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: 'fonts/roboto/Roboto-Regular.ttf',
    bold: 'fonts/roboto/Roboto-Medium.ttf',
    italics: 'fonts/roboto/Roboto-Italic.ttf',
    bolditalics: 'fonts/roboto/Roboto-MediumItalic.ttf',
  },
};

@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fonts);

  createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {},
  ): PDFKit.PDFDocument {
    return this.printer.createPdfKitDocument(docDefinition, options);
  }
}
