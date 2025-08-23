<script lang="ts">
  import { onMount } from 'svelte';
  import { auth } from '../firebase/client';
  import { onAuthStateChanged, signOut } from 'firebase/auth';

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
</script>

<div>
  {#if user}
    <p>ようこそ、{user.email} さん！</p>
    <button on:click={handleSignOut}>ログアウト</button>
  {:else}
    <p>読み込み中...</p>
  {/if}
</div>

<style lang="scss">

</style>