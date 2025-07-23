import { defineMiddleware, sequence } from 'astro:middleware';

const customDomainRedirect = defineMiddleware(async (context, next) => {
  const customDomain = import.meta.env.PUBLIC_CUSTOM_DOMAIN; // Astroでの環境変数の取得方法
  const host = context.request.headers.get('host');

  // .pages.dev でのアクセスであり、かつカスタムドメインが設定されている場合
  if (host && customDomain && host.endsWith('.pages.dev')) {
    // カスタムドメインにパスとクエリパラメータを維持してリダイレクト
    const newUrl = new URL(context.url.pathname, `https://${customDomain}`);
    newUrl.search = context.url.search;

    // 301リダイレクト（恒久的な移動）を返す
    // Responseオブジェクトを直接返すことでリダイレクトが可能
    return new Response(null, {
      status: 301,
      headers: {
        'Location': newUrl.toString(),
      },
    });
  }

  // それ以外のアクセスはそのまま通す
  return next();
});

// 複数のミドルウェアがある場合はsequenceでまとめることができます
export const onRequest = sequence(customDomainRedirect);
