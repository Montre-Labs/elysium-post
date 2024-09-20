import { Module } from '@nestjs/common';
import { AdaptersModule } from './adapters/adapters.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), AdaptersModule],
})
export class AppModule {}
