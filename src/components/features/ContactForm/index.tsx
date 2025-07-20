'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

import Link from 'next/link';

import { fetchSendData } from '@/libs/fetchSendData';

import styles from './contactForm.module.scss';

type FormValues = {
  name: string;
  email: string;
  message: string;
  required: boolean;
  policy: boolean;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    shouldUseNativeValidation: true,
    defaultValues: {
      name: '',
      email: '',
      message: '',
      required: false,
      policy: false,
    },
  });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.required || !data.policy) {
      return;
    }
    const formData = {
      name: data.name,
      email: data.email,
      message: data.message,
    };
    const fetchData = async () => {
      const response = await fetchSendData(formData);
      return response;
    };
    fetchData().then((data) => {
      if (data === 'Success') {
        reset();
        alert(
          '送信が成功しました\n入力されたメールアドレスに送信完了通知が届いているかご確認ください。\n届いていない場合、メールアドレスが間違っていたりドメインが拒否されている場合がありますので設定を見直してから再度送信してください。'
        );
      } else {
        alert('送信が失敗しました\n何度も続く場合は、直接メールアドレスにお送りください。');
      }
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor='name'>
          名前 <span className={styles.required}>*</span>
        </label>
        <input
          id='name'
          type='text'
          {...register('name', {
            required: '名前は必須項目です。',
          })}
          className='c-input'
        />
        {/* エラーがある場合にメッセージを表示 */}
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor='email'>
          メールアドレス <span className={styles.required}>*</span>
        </label>
        <input
          id='email'
          type='email'
          {...register('email', {
            required: 'メールアドレスは必須項目です。',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '有効なメールアドレスを入力してください。',
            },
          })}
          className='c-input'
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor='message'>
          お問い合わせ内容 <span className={styles.required}>*</span>
        </label>
        <TextareaAutosize
          id='message'
          minRows={5}
          {...register('message', {
            required: 'お問い合わせ内容は必須項目です。',
          })}
          className='c-textarea'
          style={{ resize: 'vertical' }}
        />
        {errors.message && <p className={styles.error}>{errors.message.message}</p>}
      </div>
      <div className={styles.formGroup}>
        <div className={styles.visuallyHidden}>
          <label htmlFor='honeypot'>If you are a human, do not fill this field.</label>
          <input autoComplete='off' id='honeypot' tabIndex={-1} type='text' />
        </div>

        <div className={styles.checkboxWrapper}>
          <input
            className={styles.checkbox}
            id='policy'
            type='checkbox'
            {...register('policy', {
              required: 'プライバシーポリシーへの同意は必須項目です。',
            })}
          />
          <label className={styles.checkboxLabel} htmlFor='policy'>
            <Link href='/privacy' target='_blank'>
              プライバシーポリシー
            </Link>
            に同意する
            <span className={styles.required}>*</span>
          </label>
          {errors.policy && <p className={styles.error}>{errors.policy.message}</p>}
        </div>
      </div>
      <button className='c-button c-button--primary' disabled={isSubmitting} type='submit'>
        {isSubmitting ? '送信中...' : '送信する'}
      </button>
    </form>
  );
}
