<script lang='ts'>
  import { onMount } from 'svelte';
  import { auth } from '../firebase/client.ts';
  import { onAuthStateChanged, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

  let user: any = null;
  let emailAddress: string = '';
  let password: string = '';
  let errorMessage: string = '';
  let showPasswordInput = false;

  onMount(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      user = authUser;
      if (user) {
        emailAddress = user.email;
      }
    });
    return () => unsubscribe();
  });

  const handleEmailChange = async () => {
    if (!user) return;

    if (emailAddress === user.email) {
      errorMessage = '新しいメールアドレスが現在のものと同じです。';
      return;
    }

    errorMessage = '';
    showPasswordInput = true;
  };

  const confirmChange = async () => {
    if (!user || !password) {
      errorMessage = 'パスワードを入力してください。';
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      await updateEmail(user, emailAddress);
      alert('メールアドレスが正常に変更されました。');
      location.reload();
    } catch (error: any) {
      errorMessage = error.message;
      alert(`エラー：${errorMessage}`);
      console.error(error);
    }
  };
</script>

<div>
  <form on:submit|preventDefault={() => handleEmailChange()}>
    <label>
      新しいメールアドレス
      <input
        type='email'
        placeholder='example@you.wing.osaka'
        bind:value={emailAddress}
        required
      />
    </label>
    <button type='submit'>変更に進む</button>
  </form>

  {#if showPasswordInput}
    <form on:submit|preventDefault={() => confirmChange()}>
      <label>
        現在のパスワード
        <input
          type='password'
          bind:value={password}
          required
        />
      </label>
      <button type='submit'>変更を確定</button>
    </form>
  {/if}

  {#if errorMessage}
    <p>{errorMessage}</p>
  {/if}
</div>


<style lang='scss'>

</style>