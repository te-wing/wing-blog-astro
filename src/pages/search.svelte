<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export const queryParam = writable('');

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get('q');
    if (value) {
      queryParam.set(value);
    }
  });
</script>

<section>
  <h2>検索中の語句： {$queryParam}</h2>
</section>