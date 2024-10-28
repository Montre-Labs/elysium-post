import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { ListContactsQuery } from '../queries/list-contacts.query';

@Controller('/contact/list')
@ApiTags('Contacts')
export class ListContactsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async execute() {
    const query = new ListContactsQuery();
    return this.queryBus.execute(query);
  }
}
