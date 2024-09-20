import { NodemailerAdapter } from 'src/adapters/nodemailer-adapter';
import { describe, it, expect } from 'vitest';

describe('NodemailerAdapter', () => {
  it('should send an email', async () => {
    const sut = new NodemailerAdapter();
    const payload = {
      to: 'roslyn.ward@ethereal.email',
      subject: 'Email for test',
      text: 'Text for test',
    };
    const result = await sut.send(payload);
    expect(result.accepted.includes(payload.to)).toBeTruthy();
  });
});
