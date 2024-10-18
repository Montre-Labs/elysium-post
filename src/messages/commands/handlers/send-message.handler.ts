import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SendMessageCommand } from '../send-message.command';
import { PrismaAdapter } from 'src/adapters/prisma-adapter';
import { NodemailerAdapter } from 'src/adapters/nodemailer-adapter';
import { MessageSendedEvent } from 'src/messages/events/message-sended.event';

@CommandHandler(SendMessageCommand)
export class SendMessageHandler implements ICommandHandler<SendMessageCommand> {
  constructor(
    private readonly db: PrismaAdapter,
    private readonly emailAdapter: NodemailerAdapter,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SendMessageCommand): Promise<void> {
    const { subject, text, html, to } = command.input;
    const message = await this.db.messages.create({
      data: {
        to,
        subject,
        text,
      },
    });
    const response = await this.emailAdapter.send({
      subject,
      text,
      html,
      to,
    });
    if (response.messageId) {
      const event = new MessageSendedEvent(message.id);
      this.eventBus.publish(event);
    }
  }
}
