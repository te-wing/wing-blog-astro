'use client';

import { useState, useRef } from 'react';
import styles from '../styles/formstyles.module.scss';
import Turnstile from './Turnstile'; // Turnstileコンポーネントをインポート

export default function FormBox() {
  // フォーム送信ボタンの参照を保持
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  
  // Turnstileの検証トークンを管理するステート
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // Turnstileから検証トークンが渡されたときに実行される関数
  const handleVerify = (token: string) => {
    setTurnstileToken(token);
    // トークンが有効な場合、フォーム送信ボタンを有効化する
    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = false;
    }
  };

  // フォーム送信時のイベントハンドラ
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ページの再読み込みを防ぐ

    // Turnstileのトークンがない場合は送信を中止
    if (!turnstileToken) {
      alert('「私はロボットではありません」にチェックを入れてください。');
      return;
    }

    // ここでフォームデータを取得
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // フォームデータにTurnstileトークンを追加
    formData.append('cf-turnstile-response', turnstileToken);

    // サーバーサイドへデータを送信
    console.log('フォーム送信中:', Object.fromEntries(formData.entries()));
    alert('フォームを送信しました！');
    
    // 成功後の処理（例: フォームのリセット）
    form.reset();
    setTurnstileToken(null);
    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = true;
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
        <select id="rate" name="rate" required>
          <option value="">選択してください</option>
          <option value="5">5 - とても良い</option>
          <option value="4">4 - 良い</option>
          <option value="3">3 - 普通</option>
          <option value="2">2 - 悪い</option>
          <option value="1">1 - とても悪い</option>
        </select>
        <br /><br />
        <label className={styles.formLabel} htmlFor="comment">ご意見・お問合せ（任意）：</label>
        <textarea placeholder="コメント・お問合せなどを入力してください．" className={styles.commentBox} id="comment" name="comment"></textarea><br/><br/>
        
        {/* Turnstileウィジェットの追加 */}
        <Turnstile sitekey="0x4AAAAAABpyNGg6V96WphRE" onVerify={handleVerify} />
        <br /><br />

        <button 
          id="submitButtonOnForm" 
          className={styles.submitBtn} 
          type="submit"
          ref={submitButtonRef}
          disabled={!turnstileToken}
        >
          送信
        </button>
      </form>
    </div>
  );
}