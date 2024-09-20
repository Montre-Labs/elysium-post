import { Module } from '@nestjs/common';
import { NodemailerAdapter } from './nodemailer-adapter';

@Module({
  providers: [NodemailerAdapter],
  exports: [NodemailerAdapter],
})
export class AdaptersModule {}
