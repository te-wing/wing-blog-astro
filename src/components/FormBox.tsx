'use client';

import { useState } from 'react';
import styles from '../styles/formstyles.module.scss';
import Turnstile from './Turnstile'; // Turnstileコンポーネントをインポート

export default function FormBox() {
  // サイト評価の状態を管理
  const [rate, setRate] = useState<string>('');
  // Turnstileの検証トークンを管理
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // 送信ボタンの有効/無効を判定
  const isButtonDisabled = !rate || !turnstileToken;

  // Turnstileから検証トークンが渡されたときに実行される関数
  const handleVerify = (token: string) => {
    setTurnstileToken(token);
  };

  // フォーム送信時のイベントハンドラ
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isButtonDisabled) {
      alert('評価を忘れずに．あと，ロボットさんお断り．');
      return;
    }

    // ここでフォームデータを取得
    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append('host', 'diaries.wing.osaka');

    // フォームデータにTurnstileトークンを追加
    formData.append('cf-turnstile-response', turnstileToken as string);

    // サーバーサイドへデータを送信
    const workerUrl = 'https://form-workers.wing.osaka';
    try {
      const response = await fetch(workerUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('おおきに、たぶんアンケートの送信ができました。');
        form.reset();
        setRate('');
        setTurnstileToken(null);
      } else {
        const result = await response.json();
        alert('エラー：' + result.error);
      }
    } catch (error) {
      console.error('通信エラー：', error);
      alert('通信中にエラーが発生しましたと思います。');
    }
  };

  return (
    <div className={styles.formBox}>
      <h4 className={styles.h4}>アンケート</h4>
      <form className={styles.form} id="survey-form" onSubmit={handleSubmit}>
        <label className={styles.formLabel} htmlFor="username">お名前（任意）：</label>
        <input placeholder="ニックネームも可" className={styles.shortTextBox} type="text" id="username" name="username" /><br /><br />
        <label className={styles.formLabel} htmlFor="email">メールアドレス（任意）：</label>
        <input placeholder="example@you.wing.osaka" className={styles.shortTextBox} type="email" id="email" name="email" /><br /><br />
        
        <label className={styles.formLabel} htmlFor="rate">サイト評価（必須）：</label>
        <select id="rate" name="rate" required value={rate} onChange={(e) => setRate(e.target.value)}>
          <option value="">選択してください</option>
          <option value="5">5 - とても良い</option>
          <option value="4">4 - 良い</option>
          <option value="3">3 - 普通</option>
          <option value="2">2 - 悪い</option>
          <option value="1">1 - とても悪い</option>
        </select>
        <br /><br />
        
        <label className={styles.formLabel} htmlFor="comment">ご意見・お問合せ（任意）：</label>
        <textarea placeholder="コメント・お問合せなどを入力してください。" className={styles.commentBox} id="comment" name="comment"></textarea><br/><br/>
        
        <Turnstile sitekey="0x4AAAAAABpyNGg6V96WphRE" onVerify={handleVerify} />
        <br /><br />

        <button 
          id="submitButtonOnForm" 
          className={`${styles.submitBtn} ${isButtonDisabled ? styles.disabledBtn : ''}`}
          type="submit"
          disabled={isButtonDisabled}
        >
          送信
        </button>
      </form>
    </div>
  );
}