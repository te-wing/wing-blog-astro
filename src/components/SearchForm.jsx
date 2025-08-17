'use client';

import { useState } from "react";
import Turnstile from './Turnstile';

export default function SearchForm() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const tokenInput = document.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]');
    const token = tokenInput?.value || "dummy-token";

    if (query.trim()) {
      const encodedQuery = encodeURIComponent(query.trim());
      const encodedToken = encodeURIComponent(token);
      window.location.href = `/search?q=${encodedQuery}&token=${encodedToken}`;
    } else {
      alert("検索語を入力してください。");
    }
  };

  return (
    <div>
      <h4>検索</h4>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="入力して検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Turnstile sitekey="0x4AAAAAABpyNGg6V96WphRE" client:load />
        <button type="submit">検索</button>
      </form>
    </div>
  );
}