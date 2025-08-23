<script lang='ts'>
  import {onMount} from 'svelte';
  import {auth} from '../firebase/client.ts';
  import {getAuth, onAuthStateChanged, updateProfile} from 'firebase/auth';
    import { useReducer } from 'react';

  let user: any = null;
  let nickname: string = '';

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
  
  const handleAuth = async () => {
    if (user) {
      try {
        await updateProfile(user, {displayName: nickname});
      } catch (error: any) {
        errorMessage = error.message;
        alert(`エラー：${errorMessage}`)
      }
    }
  };
  
</script>


<div>
  <form>
    <input type='text' placeholder='ニックネーム' bind:value={nickname} required/>
    <button type='submit'>変更</button>
  </form>
</div>


<style lang='scss'>

</style>