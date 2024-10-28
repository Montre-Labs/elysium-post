import { ICommand } from '@nestjs/cqrs';
import { SendEmailByTopicDto } from '../dtos/send-email.dto';

export class SendEmailByTopicCommand implements ICommand {
  constructor(readonly input: SendEmailByTopicDto) {}
}
