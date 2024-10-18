import { Module } from '@nestjs/common';
import { AdaptersModule } from './adapters/adapters.module';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [ConfigModule.forRoot(), AdaptersModule, MessagesModule],
})
export class AppModule {}
