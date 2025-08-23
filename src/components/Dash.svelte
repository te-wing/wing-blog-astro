<script lang="ts">
  import { onMount } from 'svelte';
  import { initializeApp } from 'firebase/app';
  import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

  let user: any = null;
  let auth: any;

  onMount(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyC8wCC2sET6sL67lsBqhdnUlVYFgEIYI54",
      authDomain: "wing-diaries-comment-80bb4.firebaseapp.com",
      projectId: "wing-diaries-comment-80bb4",
      storageBucket: "wing-diaries-comment-80bb4.firebasestorage.app",
      messagingSenderId: "334467194484",
      appId: "1:334467194484:web:a3d87266e43bfdadfefb21",
      measurementId: "G-DGVDJXX72L"
    };

    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      user = authUser;
      if (!user) {
        window.location.href = '/login';
      }
    });
    return () => unsubscribe();
  });
</script>

<div>

</div>

<style lang="scss">

</style>