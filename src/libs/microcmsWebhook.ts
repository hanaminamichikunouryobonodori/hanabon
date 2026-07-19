import { createHmac, timingSafeEqual } from 'crypto';

export const verifyMicrocmsSignature = (
  signature: string | null,
  secret: string | undefined,
  body: string
) => {
  if (!signature || !secret) return false;

  const expected = createHmac('sha256', secret).update(body).digest('hex');
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== signatureBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, signatureBuffer);
};

export type MicrocmsWebhookPayload = {
  api: string;
  id: string;
  type: 'new' | 'edit' | 'delete' | 'moveToDraft';
};
