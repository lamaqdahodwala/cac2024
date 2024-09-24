<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	//
	let rawContent = '';

	export let lessonId: string;
  export let initContent: string;

  onMount(() => {
    rawContent = initContent
  })

  $: { rawContent = initContent }


	let savingText = '';

	async function save() {
    savingText = "Saving..."
		await fetch('/api/updateLessonContent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				lessonId: lessonId,
				newContent: rawContent
			})
		});

    invalidateAll()

    savingText="Saved"
    setTimeout(() => savingText = "")
	}

	let timer: number | undefined;
	const debounce = (e: Event) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			save();
		}, 500);
	};
</script>

<div>
  {#if savingText} 
    <small>{savingText}</small>
  {:else} 
    <br>
  {/if}
</div>  
<textarea class="input" bind:value={rawContent} on:input={debounce}></textarea>
<hr>
<div>
  {@html marked(rawContent)}
</div>

<style>
div
	div.savingTextContainer {
		min-height: 2rem;
	}

textarea {
  width: 100%;
}
</style>
