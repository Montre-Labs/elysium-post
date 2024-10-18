import { IEvent } from '@nestjs/cqrs';

export class MessageSendedEvent implements IEvent {
  constructor(readonly messageId: string) {}
}
