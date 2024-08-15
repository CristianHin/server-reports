import { Module } from '@nestjs/common';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { PrinterModule } from './printer/printer.module';
import { DataaccessModule } from './dataaccess/dataaccess.module';

@Module({
  imports: [BasicReportsModule, PrinterModule, DataaccessModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
