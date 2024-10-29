import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendEmailByTopicCommand } from '../send-email-by-topic.command';
import { PrismaAdapter } from 'src/adapters/prisma-adapter';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@CommandHandler(SendEmailByTopicCommand)
export class SendEmailByTopicHandler
  implements ICommandHandler<SendEmailByTopicCommand>
{
  constructor(
    private readonly prismaAdapter: PrismaAdapter,
    @InjectQueue('notifications') private notificationsQueue: Queue,
  ) {}

  async execute(command: SendEmailByTopicCommand): Promise<void> {
    const contacts = await this.prismaAdapter.contactTopics.findMany({
      where: { topic: command.input.topic },
      select: {
        contact: {
          select: {
            email: true,
          },
        },
      },
    });
    const emails = contacts.map(({ contact }) => contact.email);
    for (const email of emails) {
      const data = {
        to: email,
        subject: command.input.subject,
        text: command.input.text,
        html: command.input.html,
      };
      await this.notificationsQueue.add('notifications', data, {
        delay: 3000,
      });
    }
  }
}
