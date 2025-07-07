// app/api/indexing/route.js (デバッグ用)

import { NextResponse } from 'next/server';

export async function POST(request) {
  // 環境変数が存在するか、型は何かをログに出力
  console.log('--- Start Debugging Environment Variables ---');
  console.log('Type of GOOGLE_CLIENT_EMAIL:', typeof process.env.GOOGLE_CLIENT_EMAIL);
  console.log('Is GOOGLE_CLIENT_EMAIL present?', !!process.env.GOOGLE_CLIENT_EMAIL);

  console.log('Type of GOOGLE_PRIVATE_KEY:', typeof process.env.GOOGLE_PRIVATE_KEY);
  console.log('Is GOOGLE_PRIVATE_KEY present?', !!process.env.GOOGLE_PRIVATE_KEY);
  console.log('--- End Debugging ---');

  // ここで一時的に処理を中断し、デバッグ情報だけを返す
  return NextResponse.json(
    {
      message: 'Debugging in progress. Check Vercel logs.',
      client_email_type: typeof process.env.GOOGLE_CLIENT_EMAIL,
      private_key_type: typeof process.env.GOOGLE_PRIVATE_KEY,
    },
    { status: 200 }
  );
}
