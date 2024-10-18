import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MessageSendedEvent } from '../message-sended.event';
import { PrismaAdapter } from 'src/adapters/prisma-adapter';

@EventsHandler(MessageSendedEvent)
export class MessageSendedHandler implements IEventHandler<MessageSendedEvent> {
  constructor(private readonly db: PrismaAdapter) {}

  async handle(event: MessageSendedEvent): Promise<void> {
    await this.db.messages.update({
      data: {
        sended: true,
      },
      where: {
        id: event.messageId,
      },
    });
  }
}
