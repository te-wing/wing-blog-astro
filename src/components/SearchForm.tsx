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
      <form onSubmit={handleSubmit}>
        <input
          placeholder="入力して検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* onVerify プロパティを追加して、トークンを受け取る */}
        <Turnstile sitekey="0x4AAAAAABpyNGg6V96WphRE" onVerify={handleVerify} />
        <button type="submit">検索</button>
      </form>
    </div>
  );
}