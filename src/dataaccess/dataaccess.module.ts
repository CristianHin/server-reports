import { Module } from '@nestjs/common';
import { DataaccessService } from './dataaccess.service';

@Module({
  providers: [DataaccessService],
  exports: [DataaccessService],
})
export class DataaccessModule {}
