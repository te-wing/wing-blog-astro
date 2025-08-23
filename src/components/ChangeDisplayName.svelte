<script lang='ts'>
  import {onMount} from 'svelte';
  import {auth} from '../firebase/client.ts';
  import {onAuthStateChanged} from 'firebase/auth';

  let user: any = null;
  let nickname: string = '';

  onMount(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      user = authUser;
      if (user) {
        nickname = user.displayName;
      } else {
        nickname = '未設定';
      }
    });
    return () => unsubscribe();
  });
  
  
</script>


<div>
  <form>
    <input type='text' placeholder='ニックネーム' bind:value='{nickname}' />
    <button>変更</button>
  </form>
</div>


<style lang='scss'>

</style>