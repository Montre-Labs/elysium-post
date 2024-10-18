import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaAdapter } from 'src/adapters/prisma-adapter';
import { SendMessageCommand } from '../commands/send-message.command';

@Injectable()
export class ReprocessMessagesService {
  constructor(
    private readonly db: PrismaAdapter,
    private readonly commandBus: CommandBus,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async execute() {
    const messages = await this.db.messages.findMany({
      where: {
        sended: false,
      },
    });
    if (messages.length == 0) return;
    await this.db.messages.deleteMany({
      where: {
        sended: false,
      },
    });
    for (const message of messages) {
      const command = new SendMessageCommand(message);
      await this.commandBus.execute(command);
    }
  }
}
