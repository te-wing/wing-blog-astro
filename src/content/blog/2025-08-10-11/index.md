---
title: 検索エンジンをシャッフルしてみた話
description: いろんな検索エンジンを使って調べることって，情報の正確性を担保する観点から大事やと思うんですよね〜．
publishDate: '2025-08-10T18:00:00'
author: Wing
tags: ["プログラミング", "しょうもないこと"]
projects: ["検索エンジンをシャッフルしよう！"]
---

こんばんは，Wingです．  
今日は，検索エンジンをシャッフルして見た話を書こうと思っとります．  
こういうふうに書くと，「シャッフルって何やねん？」みたいな声が聞こえてきそうなもんです．  
結論から言うと，「検索ボックスに文字を押してから，『検索ボタンをクリックする』まで，どの検索エンジンが使われるか分からない」ということで，つまり検索ボタンを押してからランダムで検索エンジンを選ぶということです．

### そんなんできるんかいな？
できます，というか，できました．<br>
なんでそんなことができるかと言うとですね，検索エンジンのURL構成が関係してるんです．<br><br>
次のURLを見てくださいな．何のリンクかわかりますか？  
`https://www.bing.com/search?q=osaka`<br><br>
これは，Microsoft製の検索エンジンである[Bing](https://bing.com)（Microsoft EdgeとかInternet Explorerを使ったことがある人には，馴染み深いかもしれません）で，「osaka」と検索したときのURLです．  
どーゆー法則があるのかというとですね，<br><br>
`https://www.bing.com/search`<span class='highlightInMarkdown'>`?q=osaka`</span>  
この色が変わってる部分をよく見ると．検索したワードがそのまま表示されているわけです．もちろん，他の検索エンジンでも，同じような構成になっているわけです．  
これを利用すると，ある程度簡単なプログラムで，簡単に検索エンジンをシャッフルすることができてしまうわけです！

### じゃあ早速プログラム組んでいこか
コードの管理に[GitHub](https://github.com/)というものを使ってまして，そのリポジトリ（プログラムの塊みたいなもん）の名前をつけるのにまあまあ悩んだわけです．で，めっちゃ悩んだ結果，開けるまでどんなページに飛ぶかわからんってのが，闇鍋に似てるなと思ったんで，それをそのままプロジェクトの名前にしたわけです．<br><br>
[yaminabe-search　GitHubリポジトリ](https://github.com/te-wing/yaminabe-search.git)<br>
[闇鍋検索　ウェブ版](https://闇鍋.app.wing.osaka)<br><br>
とまあ，この闇鍋の宣伝は置いといて，肝心のプログラムの部分やね．

#### フレームワーク
Next.jsを使いました．とはいっても，全部クライアントサイドだけで完結できるようにしてあります．
（ちなみに，Next.jsなのにCloudflare Pagesにデプロイしてるのは，帯域幅料金ケチりたいからです．全部クライアントサイドにしたのも同じ理由）<br><br>

#### まずは検索ボックスのページ
/src/app/page.tsx
```ts
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FormEvent, ChangeEvent } from 'react';

export default function Home() {
  const [searchWord, setSearchWord] = useState<string>('');
  const router = useRouter();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchWord) {
      const url = `/search?q=${encodeURIComponent(searchWord)}`;
      router.push(url);
    }
  };

  return (
    <>
      <header>
        <h1>闇鍋検索</h1>
      </header>
      <form onSubmit={handleSubmit} id='searchForm'>
        <input
          onChange={handleInputChange}
          type='text'
          value={searchWord}
          id='searchInput'
          name='word'
          placeholder='なんか入力して検索'
        />
        <button type='submit'>
          検索！
        </button>
      </form>
      <footer></footer>
    </>
  );
}
```
TypeScriptっていう言語やけど，UIとプログラムを同じコードで書けるのが便利ですよねぇ．
で，コードの送信に関わってるのは，主にこの部分やね．<br>
```ts
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchWord) {
      const url = `/search?q=${encodeURIComponent(searchWord)}`;
      router.push(url);
    }
  };
```
簡単に言うと，`encodeURIComponent(searchWord)`で検索した言葉をURLに組み込める形式にして，`/search?q=`とくっつけるって感じですね．<br>
しかしこれでは，まだ検索部分のロジックはできてないわけです．
#### 検索中のページを作る
/src/app/search/page.tsx
```ts
import SearchRedirect from '@/components/SearchRedirect.js';

export default function SearchPage() {
  return (
    <>
      省略
    </>
  );
}
```
なんかめっちゃコンパクトやんって思う方もいるかもしれませんが，一番上の行のように，他のファイルのプログラムを読み込んでるから簡潔なだけなんですねぇ．<br>
じゃあその読み込んでる他のファイルにリダイレクトの式を書いてあるんやけど，そっちはどんなやねんっていうと，<br>
//src/components/SearchRedirect<span class='highlightInMarkdown'>.js</span>
```js
'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchEngines } from '@/data/searchEngines';

export default function SearchRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const query = searchParams.get('q');
    if (!query || typeof query !== 'string') {
      router.push('/');
      return;
    }

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * searchEngines.length);
      const selectedEngine = searchEngines[randomIndex];
      const redirectUrl = `${selectedEngine.url}${encodeURIComponent(query)}`;
      window.location.href = redirectUrl;
    }, 500);
  }, [searchParams, router]);

  return null; // このコンポーネント自体はUIをレンダリングしない
}
```
拡張子から分かるように，これ実はJavaScriptなんですよね．さっきのTypeScriptとは違うやつです．<br>
じゃそのJavaScriptとTypeScriptの違いは何やねんっていうのは，大体一緒なんやけど，TypeScriptは，「型」，すなわち変数が数値なのか文字列なのか，みたいなのを明確に定義せねばならんってとこなんです．例えば，「wing」という文字列の変数に数字を３７足そうとするとエラーになるのは，簡単に想像できると思います．こう言う事故を減らすのがTypeScriptの役割です．<br><br>
じゃあなんでわざわざリダイレクトのとこだけJavaScriptで書いたかと言うとね，TypeScriptで書いて見て，`searchParams`変数の型定義にめっちゃ苦労して，面倒くさくなったからここだけJavaScriptに変えたと言うわけです．それでUIの部分とファイルも別々やったってわけですね．<br>
で，このファイルのロジックがどうなってるかざっくり説明すると，`const selectedEngine = searchEngines[randomIndex];`の部分で，検索エンジンをランダムに選択して，さっき説明した方法でいろんな検索エンジンでのURLを生成してる，ということです．<br>
ちなみに，`import { searchEngines } from '@/data/searchEngines';`の部分で，検索エンジンごとのURLの構文をひたすら並列してあるって言う感じです．<br><br>
よかったらGitHubリポジトリも見みてください．