<script lang="ts">
  import { onMount } from 'svelte';
  import { auth } from '../firebase/client';
  import { onAuthStateChanged, signOut, sendEmailVerification } from 'firebase/auth';

  let user: any = null;

  onMount(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      user = authUser;
      if (!user) {
        window.location.href = '/login';
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
    <p>ようこそ、{user.email} さん！</p>
    <button on:click={handleSignOut}>ログアウト</button>
    <h3>アカウントについて</h3>
    {#if user.emailVerified}
      <p>メールは認証済みです．</p>
    {:else}
      <p>メールが認証されていません．アカウントの全ての機能を有効にするには，登録したメールアドレスに届いたリンクをクリックしてください．</p>
      <p>エラーにより，リンクの入ったメールが送られてこない場合があります．その際は，以下のボタンをクリックして頂くと，認証リンクを再送させていただきます．</p>
      <button on:click={resendVerificationEmail}>認証メールを再送する</button>
    {/if}
  {:else}
    <p>読み込み中...</p>
  {/if}
</div>

<style lang="scss">

</style>