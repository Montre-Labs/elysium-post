import { Module } from '@nestjs/common';
import { NodemailerAdapter } from './nodemailer-adapter';
import { PrismaAdapter } from './prisma-adapter';

@Module({
  providers: [NodemailerAdapter, PrismaAdapter],
  exports: [NodemailerAdapter, PrismaAdapter],
})
export class AdaptersModule {}
