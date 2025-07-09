import Link from 'next/link';

import ContactForm from '@/components/features/ContactForm';
import MinchoHeadingComponent from '@/components/ui/MinchoHeading';

import styles from './contact.module.scss';

const ContactSection = () => {
  return (
    <>
      <MinchoHeadingComponent id='contact' level={2}>
        問い合わせ
      </MinchoHeadingComponent>
      <div className='l-container l-grid l-grid--half px-lg'>
        <div>
          <ContactForm />
        </div>
        <div className={styles.notes}>
          <p>フォームより、お気軽にお問い合わせください。</p>
          <p>
            お問い合わせ後、ご入力いただいたメールアドレス宛に、受付完了の自動返信メールを
            <code>
              <span>hanaminamibonodori</span>
              <span className={styles.atSymbol}></span>
              <span>gmail.com</span>
            </code>
            よりお送りします。
            メールが届かない場合に備え、「@gmail.com」からのメールを受信できるよう設定をご確認いただくとともに、迷惑メールフォルダもあわせてご確認ください。
          </p>
          <p>
            内容や時期により、返信にお時間をいただく場合がございます。恐れ入りますが、返信日時のご指定は承っておりませんので、あらかじめご了承ください。
          </p>

          <div className={styles.notesSection}>
            <ul className={styles.notesList}>
              <li>
                ご入力いただいた個人情報は、ご本人の同意なく花南盆踊り実行委員会メンバー以外の第三者に提供することはございません。詳細は
                <Link href='/privacy'>プライバシーポリシー</Link>をご確認ください。
              </li>
              <li>未成年の方のお問い合わせは、保護者の方の許可を得た上で送信してください。</li>
              <li>
                万が一フォームに不具合が発生している場合は、お手数ですが下記メールアドレスへ直接ご連絡ください。
                <br />
                <code>
                  <span>hanaminamibonodori</span>
                  <span className={styles.atSymbol}></span>
                  <span>gmail.com</span>
                </code>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactSection;
