// src/middleware.ts
import { defineMiddleware, sequence } from 'astro/middleware';

const redirectPagesDev = defineMiddleware(async (context, next) => {
  const customDomain = 'diaries.wing.osaka'; // ここをあなたのカスタムドメインに置き換えてください
  const pagesDevDomainSuffix = '.pages.dev';

  // 現在のリクエストのホスト名を取得
  const host = context.url.hostname;

  // ホスト名が *.pages.dev で終わる場合、カスタムドメインにリダイレクトする
  if (host.endsWith(pagesDevDomainSuffix) && host !== customDomain) {
    // 完全に同じパスを維持してリダイレクト
    const newUrl = new URL(context.url);
    newUrl.hostname = customDomain;
    // 301 Permanent Redirect (恒久的なリダイレクト) を推奨
    return context.redirect(newUrl.toString(), 301);
  }

  // それ以外の場合は、通常通り処理を進める
  return next();
});

export const onRequest = sequence(redirectPagesDev);