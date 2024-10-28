import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateContactDto } from '../dtos/create-contact.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { CreateContactCommand } from '../commands/create-contact.command';

@Controller()
@ApiTags('Contacts')
export class CreateContactController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('contact')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Contact created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Contact already exists',
  })
  async execute(@Body() input: CreateContactDto) {
    const command = new CreateContactCommand(input.email, input.topics);
    await this.commandBus.execute(command);
  }
}
