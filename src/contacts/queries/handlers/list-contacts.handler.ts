import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { ListContactsQuery } from '../list-contacts.query';
import { PrismaAdapter } from 'src/adapters/prisma-adapter';

@QueryHandler(ListContactsQuery)
export class ListContactsHandler implements ICommandHandler<ListContactsQuery> {
  constructor(private readonly prismaAdapter: PrismaAdapter) {}

  async execute(): Promise<any> {
    const contacts = await this.prismaAdapter.contacts.findMany({
      include: {
        contactTopics: {
          select: {
            topic: true,
          },
        },
      },
    });
    const data = contacts.map((item) => ({
      id: item.id,
      email: item.email,
      topics: item.contactTopics.map(({ topic }) => topic),
    }));
    return data;
  }
}
