'use client';

import styles from '../styles/formstyles.module.scss';

export default function FormBox() {

  return (
    <div className={styles.formBox}>
      {/* Turnstileスクリプトの読み込み */}
      <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />

      <h4 className={styles.h4}>アンケート</h4>
      <form className={styles.form} id="survey-form">
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
        <div
          className="cf-turnstile"
          data-sitekey='0x4AAAAAABpyNGg6V96WphRE'
        ></div>
        <br /><br />

        <button id="submitButtonOnForm" className={styles.submitBtn} type="submit">送信</button>
      </form>
    </div>
  );
}