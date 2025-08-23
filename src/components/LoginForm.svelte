<script lang="ts">
  import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '../firebase/client';

  let email = '';
  let password = '';
  let errorMessage = '';

  const handleAuth = async (isLogin: boolean) => {
    try {
      // `auth`オブジェクトを使って認証処理を実行
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      window.location.href = '/dash/loginComplete';
    } catch (error: any) {
      errorMessage = error.message;
      alert(`エラー: ${errorMessage}`);
      console.error(error);
    }
  };
</script>

<div>
  <h3>準備中かもしれません．</h3>
  <section>
    <form on:submit|preventDefault={() => handleAuth(true)}>
      <label for="email">メールアドレス</label>
      <input type="email" bind:value={email} required />
      <label for="password">パスワード</label>
      <input type="password" bind:value={password} required minlength="6" />
      {#if errorMessage}
        <p>{errorMessage}</p>
      {/if}
      <button type="submit">ログイン</button>
      <button type="button" on:click={() => handleAuth(false)}>新規登録</button>
    </form>
  </section>
</div>

<style lang='scss'>
  section {
    display: flex;
    justify-content: center;
  }

  form {
    display: block;
    width: 100%;
    max-width: 400px;

    input {
      font-family: FiraCode;
      width: 100%;
    }
  }

  div {
    width: 100%;
    a {
      text-align: center;
      width: 140px;
    }
  }
</style>