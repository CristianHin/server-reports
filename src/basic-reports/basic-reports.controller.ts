import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Basic Reports')
@Controller('basic-report')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @ApiOperation({ summary: 'Generate an employment letter PDF' })
  @ApiParam({
    name: 'employeeId',
    required: true,
    description: 'ID of the employee',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'The PDF has been successfully generated.',
    content: { 'application/pdf': {} },
  })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @Get('/employment-letter/:employeeId')
  async getEmploymentLetter(
    @Res() response: Response,
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ) {
    const doc =
      await this.basicReportsService.createEmploymentLetter(employeeId);
    response.setHeader('Content-Type', 'application/pdf');
    doc.pipe(response);
    doc.end();
  }
}
