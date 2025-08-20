'use client';

import { useState } from "react";
import Turnstile from './Turnstile';
import styles from '../styles/SearchForm.module.scss'

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // Turnstileからトークンを受け取るハンドラ
  const handleVerify = (token: string) => {
    setTurnstileToken(token);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Turnstileトークンがない場合は送信を中止
    if (!turnstileToken) {
      alert("ロボットさんお断り");
      return;
    }

    if (query.trim()) {
      const encodedQuery = encodeURIComponent(query.trim());
      const encodedToken = encodeURIComponent(turnstileToken);
      window.location.href = `/search/?q=${encodedQuery}&token=${encodedToken}`;
    } else {
      alert("検索語を入力してください．");
    }
  };

  return (
    <div>
      <p>Coming Soon...</p>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <input
          placeholder="入力して検索"
          className={styles.searchBox}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* onVerify プロパティを追加して、トークンを受け取る */}
        <Turnstile sitekey="0x4AAAAAABpyNGg6V96WphRE" onVerify={handleVerify} />
        <button
          type="submit"
          className={styles.SearchButton}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
        </button>
      </form>
    </div>
  );
}