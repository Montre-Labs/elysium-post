import { Module } from '@nestjs/common';
import { CreateContactController } from './controllers/create-contact.controller';
import { CreateContactHandler } from './commands/handlers/create-contact.handler';
import { AdaptersModule } from 'src/adapters/adapters.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ListContactsController } from './controllers/list-contacts.controller';
import { ListContactsHandler } from './queries/handlers/list-contacts.handler';
import { SendEmailByTopicController } from './controllers/send-email-by-topic.controller';
import { SendEmailByTopicHandler } from './commands/handlers/send-email-by-topic.handler';
import { BullModule } from '@nestjs/bullmq';
import { NotificationsConsumer } from './queue/notifications-consumer';

@Module({
  imports: [
    AdaptersModule,
    CqrsModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
        password: 'root',
      },
    }),
    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  controllers: [
    CreateContactController,
    ListContactsController,
    SendEmailByTopicController,
  ],
  providers: [
    CreateContactHandler,
    ListContactsHandler,
    SendEmailByTopicHandler,
    NotificationsConsumer,
  ],
})
export class Contacts {}
