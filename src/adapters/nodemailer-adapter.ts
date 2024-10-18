import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { SendEmail } from './types/send-email';

@Injectable()
export class NodemailerAdapter {
  private transport() {
    const transport = createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    return transport;
  }

  async send(input: SendEmail) {
    const info = await this.transport().sendMail({
      from: process.env.EMAIL_ADDRESS,
      ...input,
    });
    return info;
  }
}
