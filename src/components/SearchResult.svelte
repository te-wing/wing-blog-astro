<script lang="ts">
  import { onMount } from 'svelte';

  export let workerUrl: string;
  
  let query: string | null = null;
  let results: any[] = [];
  let isLoading = true;
  let error: string | null = null;

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const token = params.get('token');

    if (q && token) {
      query = q;
      await fetchResults(q, token);
    } else {
      isLoading = false;
      error = '検索語または認証トークンが見つかりません．';
    }
  });

  async function fetchResults(searchQuery: string, token: string) {
    try {
      isLoading = true;
      error = null;
      const response = await fetch(workerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery, token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '検索に失敗しました．');
      }
      
      results = data.hits || [];
    } catch (err: any) {
      console.error('Error fetching search results:', err);
      error = err.message || 'なんか事故った';
      results = [];
    } finally {
      isLoading = false;
    }
  }
</script>

<div>
  {#if isLoading}
    <p>検索中...</p>
  {:else if error}
    <p>{error}</p>
  {:else}
    <p>「{query}」の検索結果:</p>
    <div>
      {#if results.length > 0}
        {#each results as hit (hit.objectID)}
          <div>
            <h3>{hit.title}</h3>
            <p>{hit.description}</p>
          </div>
        {/each}
      {:else}
        <p>該当する検索結果はありませんでした。</p>
      {/if}
    </div>
  {/if}
</div>