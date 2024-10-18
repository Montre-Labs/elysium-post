import { ICommand } from '@nestjs/cqrs';
import { SendEmail } from 'src/adapters/types/send-email';

export class SendMessageCommand implements ICommand {
  constructor(readonly input: SendEmail) {}
}
