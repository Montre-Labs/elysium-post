import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SendMessageCommand } from '../commands/send-message.command';
import { ApiTags } from '@nestjs/swagger';
import { SendEmail } from '../dtos/send-message.dto';

@ApiTags('Messages')
@Controller('message')
export class SendMessageController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('send')
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() input: SendEmail) {
    const command = new SendMessageCommand(input);
    await this.commandBus.execute(command);
  }
}
