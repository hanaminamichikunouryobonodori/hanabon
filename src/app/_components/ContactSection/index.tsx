import { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

import Link from 'next/link';

import { FadeInComponent } from '@/components/animations/FadeIn';
import ContactForm from '@/components/features/ContactForm';
import MaruHeadingComponent from '@/components/ui/MaruHeading';
import { PageData } from '@/types';

import styles from './contact.module.scss';

const ContactSection = ({ data }: { data: PageData }) => {
  const [isEventPeriod, setIsEventPeriod] = useState(false);

  useEffect(() => {
    const eventDateBlock = data.content.find(
      (block: PageData['content'][number]) => block.fieldId === 'event_date'
    );

    if (!eventDateBlock || !eventDateBlock.event_dates) {
      setIsEventPeriod(false);
      return;
    }

    const eventDates = eventDateBlock.event_dates.map((item: { date: string }) => item.date);

    if (eventDates.length === 0) {
      setIsEventPeriod(false);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isInPeriod = eventDates.some((dateString: string) => {
      const eventDate = new Date(dateString);
      eventDate.setHours(0, 0, 0, 0);

      const oneWeekBefore = new Date(eventDate);
      oneWeekBefore.setDate(eventDate.getDate() - 7);

      const oneWeekAfter = new Date(eventDate);
      oneWeekAfter.setDate(eventDate.getDate() + 7);

      return today >= oneWeekBefore && today <= oneWeekAfter;
    });

    setIsEventPeriod(isInPeriod);
  }, [data.content]);

  return (
    <FadeInComponent>
      <MaruHeadingComponent className={styles.title} id='contact' level={2}>
        問い合わせ
      </MaruHeadingComponent>
      <div className={`${styles.box} l-container c-diagonal-box u-flex-left-column`}>
        {isEventPeriod && (
          <div className='c-alert-box mt-0'>
            <div className='u-flex-left-column'>
              <p>
                <strong>【重要】イベント期間中のご連絡について</strong>
              </p>
              <p className='u-flex-left-column u-text-size-sm' style={{ lineHeight: 1.5 }}>
                現在、イベント開催期間およびその前後のため、お問い合わせへの返信が遅れる可能性がございます。
                <br />
                <span style={{ textDecoration: 'underline' }}>
                  特にイベント前日や当日にいただいたお問い合わせ（質問・忘れ物のご連絡など）への
                  <strong>即日返信はできかねます</strong>。
                </span>
                いただいたご連絡へは、翌日以降に確認し順次対応させていただきますので、何卒ご了承ください。
                <br />
                <span style={{ fontWeight: 'bold' }}>
                  当日お急ぎの場合は、会場（
                  <ScrollLink
                    duration={800}
                    smooth={true}
                    style={{ cursor: 'pointer' }}
                    to='access'
                  >
                    アクセス
                  </ScrollLink>
                  ）のスタッフまで直接ご質問ください。
                </span>
              </p>
            </div>
          </div>
        )}
        <div className='l-grid l-grid--half px-lg '>
          <div>
            <ContactForm />
          </div>
          <div>
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
      </div>
    </FadeInComponent>
  );
};

export default ContactSection;
