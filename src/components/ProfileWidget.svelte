<script lang='ts'>
  import {onMount} from 'svelte';
  import {auth} from '../firebase/client.ts';
  import {onAuthStateChanged, signOut} from 'firebase/auth';
  
  let user: any = null;
  let nickname: string = '';

  onMount(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      user = authUser;
      if(user) {
        if(user.displayName) {
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
      console.error('ログアウトに失敗しました', error);
    }
  };
</script>

<div>
  <h4><a href='/dash/'>wing ID</a></h4>
  <section>
    {#if user}
      <p> {nickname} </p>
      <a href='/dash/'>ダッシュボード</a>
      <button on:click={handleSignOut}>ログアウト</button>
    {:else}
      <p>ゲスト</p>
      <a href='/login/'>ログイン</a>
    {/if}
  </section>
</div>

<style lang='scss'>

</style>