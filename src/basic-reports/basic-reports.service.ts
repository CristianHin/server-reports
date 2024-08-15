import { Injectable, NotFoundException } from '@nestjs/common';
import { DataaccessService } from 'src/dataaccess/dataaccess.service';
import { PrinterService } from 'src/printer/printer.service';
import { getEmploymentLetterReport } from 'src/reports';

@Injectable()
export class BasicReportsService {
  constructor(
    private readonly printerService: PrinterService,
    private readonly dataAccessService: DataaccessService,
  ) {}

  async createEmploymentLetter(employeeId: number) {
    const employee = await this.dataAccessService.employees.findUnique({
      where: {
        id: employeeId,
      },
    });
    if (!employee) {
      throw new NotFoundException(`Employee ${employeeId} not found`);
    }
    const docDefinition = getEmploymentLetterReport({
      employerName: 'Cristian Hincapié',
      employerPosition: 'Software engineer',
      employeeHours: employee.hours_per_day,
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Microsoft',
    });
    return this.printerService.createPdf(docDefinition);
  }
}
