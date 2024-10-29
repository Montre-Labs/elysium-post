import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NodemailerAdapter } from 'src/adapters/nodemailer-adapter';
import { SendEmail } from 'src/adapters/types/send-email';

@Processor('notifications')
export class NotificationsConsumer extends WorkerHost {
  constructor(private readonly nodemailerAdapter: NodemailerAdapter) {
    super();
  }

  async process(job: Job<SendEmail>): Promise<void> {
    const data = job.data;
    await this.nodemailerAdapter.send({
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });
  }
}
