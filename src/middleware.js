// src/middleware.js
import { defineMiddleware, sequence } from 'astro/middleware';

const redirectPagesDev = defineMiddleware(async (context, next) => {
  // 環境変数からカスタムドメインを取得
  // JavaScriptでは型チェックがないため、PUBLIC_CUSTOM_DOMAIN が存在することを前提とします。
  const customDomain = import.meta.env.PUBLIC_CUSTOM_DOMAIN;

  // リクエストのホスト名を取得
  const host = context.url.hostname;

  // .pages.dev でのアクセスであり、かつカスタムドメインが設定されている場合
  if (host && customDomain && host.endsWith('.pages.dev')) {
    // カスタムドメインにパスとクエリパラメータを維持してリダイレクト
    const newUrl = new URL(context.url); // 現在のURLから新しいURLオブジェクトを作成
    newUrl.hostname = customDomain; // ホスト名をカスタムドメインに変更

    // 301リダイレクト（恒久的な移動）を返す
    return context.redirect(newUrl.toString(), 301);
  }

  // それ以外のアクセスはそのまま通す
  return next();
});

// Astroのミドルウェアは onRequest に定義した関数をエクスポートすることで適用されます。
// 複数のミドルウェアがある場合は sequence を使って結合します。
export const onRequest = sequence(redirectPagesDev);