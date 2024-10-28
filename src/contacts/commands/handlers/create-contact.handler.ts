import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateContactCommand } from '../create-contact.command';
import { PrismaAdapter } from 'src/adapters/prisma-adapter';
import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';

@CommandHandler(CreateContactCommand)
export class CreateContactHandler
  implements ICommandHandler<CreateContactCommand>
{
  constructor(private readonly prismaAdapter: PrismaAdapter) {}

  async execute(command: CreateContactCommand): Promise<void> {
    await this.checkEmail(command);
    const input = {
      id: randomUUID(),
      email: command.email,
    };
    await this.prismaAdapter.contacts.create({
      data: input,
    });
    if (command.topics && command.topics.length > 0) {
      const topics = [...new Set(command.topics)];
      await this.prismaAdapter.contactTopics.createMany({
        data: topics.map((topic) => ({ contactId: input.id, topic })),
      });
    }
  }

  private async checkEmail(command: CreateContactCommand) {
    const exists = await this.prismaAdapter.contacts.findFirst({
      where: { email: command.email },
    });
    if (exists) {
      throw new BadRequestException('Email already exists!');
    }
  }
}
