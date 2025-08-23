<script lang='ts'>
  import {onMount} from 'svelte';
  import {auth} from '../firebase/client.ts';
  import {onAuthStateChanged, updateEmail} from 'firebase/auth';

  let user: any = null;
  let emailAddress: string = '';
  let errorMessage: string = '';

  onMount(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      user = authUser;
      emailAddress = user.email;
    });
    return () => unsubscribe();
  });

  const handleEmailChange = async() => {
    if (user) {
      try {
        await user.updateEmail(emailAddress);
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
  <form on:submit|preventDefault={() => handleEmailChange()}>
    <input
      type='email'
      placeholder='example@you.wing.osaka'
      bind:value={emailAddress} 
      required 
    />
    {#if errorMessage}
      <p>{errorMessage}</p>
    {/if}
    <button type='submit'>変更</button>
  </form>
</div>


<style lang='scss'>

</style>