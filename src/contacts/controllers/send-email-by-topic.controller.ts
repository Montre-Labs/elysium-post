import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailByTopicDto } from '../dtos/send-email.dto';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { SendEmailByTopicCommand } from '../commands/send-email-by-topic.command';

@Controller('send/topic')
@ApiTags('Contacts')
export class SendEmailByTopicController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async execute(@Body() input: SendEmailByTopicDto) {
    const command = new SendEmailByTopicCommand(input);
    await this.commandBus.execute(command);
  }
}
