import { ICommand } from '@nestjs/cqrs';

export class CreateContactCommand implements ICommand {
  constructor(
    readonly email: string,
    readonly topics?: string[],
  ) {}
}
