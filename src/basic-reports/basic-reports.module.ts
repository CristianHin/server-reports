import { Module } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { BasicReportsController } from './basic-reports.controller';
import { PrinterModule } from 'src/printer/printer.module';
import { DataaccessModule } from 'src/dataaccess/dataaccess.module';

@Module({
  controllers: [BasicReportsController],
  providers: [BasicReportsService],
  imports: [PrinterModule, DataaccessModule],
})
export class BasicReportsModule {}
