'use client';

import { useEffect, useRef } from 'react';

// Turnstileのレンダリングに必要なグローバルな型定義
declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: object) => string;
      reset: (widgetIdOrContainer: string | HTMLElement) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileProps {
  sitekey: string;
  // フォーム送信時にトークンを受け取るためのコールバック関数
  onVerify: (token: string) => void;
}

export default function Turnstile({ sitekey, onVerify }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !window.turnstile) {
      return;
    }

    // ウィジェットがすでにレンダリングされていたら何もしない
    if (widgetIdRef.current) {
      return;
    }

    // コンポーネントがマウントされた時にTurnstileウィジェットをレンダリング
    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: sitekey,
      callback: (token: string) => {
        onVerify(token);
      },
      // ユーザーがチャレンジを完了した時に呼び出される
      'after-interactive-callback': () => {
        // 例: フォームの送信ボタンを有効にするなど
      },
    });

    widgetIdRef.current = widgetId;

    // クリーンアップ関数
    return () => {
      // コンポーネントがアンマウントされた時にウィジェットを削除
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [sitekey, onVerify]); // 依存配列にsitekeyとonVerifyを追加

  return (
    <div ref={containerRef} id="cf-turnstile-container">
      {/* Turnstileウィジェットがここにレンダリングされる */}
    </div>
  );
}