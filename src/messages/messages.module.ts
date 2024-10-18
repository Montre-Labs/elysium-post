import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SendMessageHandler } from './commands/handlers/send-message.handler';
import { AdaptersModule } from 'src/adapters/adapters.module';
import { MessageSendedHandler } from './events/handlers/message-sended.handler';
import { SendMessageController } from './http/send-message.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { ReprocessMessagesService } from './tasks/reprocess-messages.service';

@Module({
  imports: [CqrsModule, AdaptersModule, ScheduleModule.forRoot()],
  providers: [
    SendMessageHandler,
    MessageSendedHandler,
    ReprocessMessagesService,
  ],
  controllers: [SendMessageController],
})
export class MessagesModule {}
