'use server';
import { headers } from 'next/headers';

export const fetchSendData = async (formData: {
  name: string;
  email: string;
  message: string;
}): Promise<string> => {
  const headersData = await headers();
  const host = headersData.get('host') || 'defaultHost';
  const protocol =
    (headersData.get('x-forwarded-proto') ?? host.startsWith('localhost')) ? 'http' : 'https';
  const apiBase = `${protocol}://${host}`;

  try {
    const response = await fetch(`${apiBase}/api/nodemailer`, {
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send data');
  }
};
