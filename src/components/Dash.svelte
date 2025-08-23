<script lang="ts">
  import { onMount } from 'svelte';
  import { auth } from '../firebase/client';
  import { onAuthStateChanged, signOut, sendEmailVerification } from 'firebase/auth';
  import ChangeDisplayName from './ChangeDisplayName.svelte';
  import ChangeEmail from './ChangeEmail.svelte';

  let user: any = null;
  let nickname: string = '';

  onMount(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      user = authUser;
      if (!user) {
        window.location.href = '/login';
      } else {
        if (user.displayName) {
          nickname = (user.displayName);
        } else {
          nickname = 'ニックネーム未設定';
        }
      }
    });
    return () => unsubscribe();
  });

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("ログアウトに失敗しました", error);
    }
  };

  const resendVerificationEmail = async () => {
    if (user && !user.emailVerified) {
      try {
        await sendEmailVerification(user);
        alert("認証メールを再送信しました。ご確認ください。");
      } catch (error) {
        console.error("メール再送に失敗しました", error);
        alert("メールの再送に失敗しました。時間をおいて再度お試しください。");
      }
    }
  };
</script>

<div>
  {#if user}
    <p>ようこそ， {nickname} さん！</p>
    <button on:click={handleSignOut}>ログアウト</button>
    <h3>アカウントについて</h3>
    <h4>メールアドレス</h4>
    <ChangeEmail />
    {#if user.emailVerified}
      <p>おめでとうございやす！ご利用のメール<span class='codeFont'>{user.email}</span>は認証済みです．</p>
    {:else}
      <p>メールが認証されていません．なりすましを防止するため，アカウントの全ての機能を有効にするには，登録したメールアドレスに届いたリンクをクリックしていただく必要があります．</p>
      <p>エラーにより，リンクの入ったメールが送られてこない場合があります．その際は，以下のボタンをクリックして頂くと，認証リンクを再送させていただきます．</p>
      <button on:click={resendVerificationEmail}>認証メールを再送する</button>
    {/if}
    <h4>パスワード</h4>
    <p>この機能は準備中です．暫くお待ちください．</p>
    <h3>公開される情報</h3>
    <h4>ニックネーム</h4>
    <ChangeDisplayName />
    {#if user.displayName}
      <div></div>
    {:else}
      <p>※ニックネームが設定されていません．</p>
    {/if}
    <p>ニックネームは，このサイト内の記事にコメントを投稿した際に表示されます．プライバシ保護のため，本名以外のニックネームをお勧めします．</p>
    <h4>投稿者ID</h4>
    <p>投稿者IDは，なりすまし防止のため各ユーザに割り当てられる，@から始まる一意の文字列です．こちらも任意の文字列を設定できますが，コメント投稿時に公開されるため，本名ではないものをご利用になることをお勧めします．</p>
  {:else}
    <p>読み込み中...</p>
  {/if}
</div>

<style lang="scss">
  .codeFont {
    font-family: FiraCode;
  }
</style>