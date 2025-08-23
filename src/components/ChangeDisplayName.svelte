<script lang='ts'>
  import {onMount} from 'svelte';
  import {auth} from '../firebase/client.ts';
  import {onAuthStateChanged, updateProfile} from 'firebase/auth';

  let user: any = null;
  let nickname: string = '';
  let errorMessage: string = '';

  onMount(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      user = authUser;
      if (user.displayName) {
        nickname = user.displayName;
      } else {
        nickname = '';
      }
    });
    return () => unsubscribe();
  });
  
  const handleNickname = async () => {
    if (user) {
      try {
        await updateProfile(user, {displayName: nickname});
        location.reload();
      } catch (error: any) {
        errorMessage = error.message;
        alert(`エラー：${errorMessage}`);
        console.error(error);
      }
    }
  };
  
</script>


<div>
  <form on:submit|preventDefault={() => handleNickname()}>
    <input type='text' placeholder='ニックネーム' bind:value={nickname} required/>
    {#if errorMessage}
      <p>{errorMessage}</p>
    {/if}
    <button type='submit'>変更</button>
  </form>
</div>


<style lang='scss'>

</style>