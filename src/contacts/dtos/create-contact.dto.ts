import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({
    required: true,
    type: 'string',
    example: 'jhon.doe@gmail.com',
  })
  email: string;

  @ApiProperty({
    required: false,
    type: 'array',
    example: ['promo', 'notification'],
    description: 'Conect email with a topic to send notification by the topic',
  })
  topics?: string[];
}
