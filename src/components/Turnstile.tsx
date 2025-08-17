'use client';

import { useEffect, useRef, useState } from 'react';

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
  onVerify: (token: string) => void;
}

export default function Turnstile({ sitekey, onVerify }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // グローバルなturnstileオブジェクトが利用可能かチェック
    if (window.turnstile) {
      setIsScriptLoaded(true);
      return;
    }

    // スクリプトがまだない場合は、動的に追加
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      // コンポーネントがアンマウントされた時にスクリプトを削除する（任意）
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    // スクリプトがロード済みで、コンテナが利用可能になったらレンダリング
    if (isScriptLoaded && containerRef.current && window.turnstile && !widgetIdRef.current) {
      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: sitekey,
        callback: (token: string) => {
          onVerify(token);
        },
      });
      widgetIdRef.current = widgetId;
    }

    // クリーンアップ
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [isScriptLoaded, sitekey, onVerify]);

  return (
    <div ref={containerRef} id="cf-turnstile-container">
      {!isScriptLoaded && <div>Loading...</div>}
    </div>
  );
}