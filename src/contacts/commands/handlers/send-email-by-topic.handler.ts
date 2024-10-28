import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendEmailByTopicCommand } from '../send-email-by-topic.command';
import { PrismaAdapter } from 'src/adapters/prisma-adapter';
import { NodemailerAdapter } from 'src/adapters/nodemailer-adapter';

@CommandHandler(SendEmailByTopicCommand)
export class SendEmailByTopicHandler
  implements ICommandHandler<SendEmailByTopicCommand>
{
  constructor(
    private readonly prismaAdapter: PrismaAdapter,
    private readonly nodemailerAdapter: NodemailerAdapter,
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
      await this.nodemailerAdapter.send({
        to: email,
        subject: command.input.subject,
        text: command.input.text,
        html: command.input.html,
      });
    }
  }
}
