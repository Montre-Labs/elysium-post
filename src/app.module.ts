import { Module } from '@nestjs/common';
import { AdaptersModule } from './adapters/adapters.module';
import { ConfigModule } from '@nestjs/config';
import { Contacts } from './contacts/contacts.module';

@Module({
  imports: [ConfigModule.forRoot(), AdaptersModule, Contacts],
})
export class AppModule {}
