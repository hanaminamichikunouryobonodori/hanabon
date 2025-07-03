import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const rawBody = await req.text();
      const bodyData = JSON.parse(rawBody);
      const name = bodyData.name;
      const email = bodyData.email;
      const message = bodyData.message;
      if (!name || !email || !message) {
        return NextResponse.json('Fail', {
          status: 500,
        });
      }
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_ACCOUNT,
          pass: process.env.MAIL_PASSWD,
        },
      });

      const mailOptions = {
        from: process.env.MAIL_ACCOUNT,
        to: email,
        subject: `【花南地区納涼盆踊り実行委員会】送信完了通知`,
        text: `※このメールはシステムにより自動で返信しています。

        ${name}様
        
        お世話になっております。
        花南地区納涼盆踊り実行委員会へのお問い合わせありがとうございました。
        
        以下の内容でお問い合わせを受け付けいたしました。
        返信が遅くなる場合がありますがご容赦ください。
        メール送信日から一週間以上経過しても返信がない場合、恐れ入りますがhanaminamibonodori@gmail.comに直接ご連絡いただけると幸いです。
        
        ━□■□ お問い合わせ内容 □■□━
        ${message}
        ━━━━━━━━━━━━━━━━━━━━━━
        `,
      };

      const adminOption = {
        from: process.env.MAIL_ACCOUNT,
        to: process.env.MAIL_TO,
        subject: `【花南地区納涼盆踊り実行委員会】${name}様から問い合わせがありました。`,
        text: `${bodyData.name}様から問い合わせがありました。
        
        内容は以下の通りです。
        名前: ${bodyData.name}
        メールアドレス: ${bodyData.email}
        問い合わせ内容: 
        ${bodyData.message}`,
      };

      const info = await Promise.all([
        transporter.sendMail(mailOptions),
        transporter.sendMail(adminOption),
      ]);
      info.forEach((item, index) => {
        console.log(`Email sent: ${index + 1}, Status: ${item.response}`);
      });
      return NextResponse.json('Success', {
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json('Fail', {
        status: 500,
      });
    }
  } else {
    return NextResponse.json('POSTメソッドを使用してください。', {
      status: 405,
    });
  }
}
