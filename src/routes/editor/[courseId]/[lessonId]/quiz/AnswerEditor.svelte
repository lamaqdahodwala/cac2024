<script lang="ts">
	export let answerId: number;
	export let answerText: string;
	let editing = false;

	function focus(el: HTMLInputElement) {
		el.focus();
	}

	async function save() {
    await fetch("/api/updateAnswerContent")
  }

	let timer: number | undefined;
	const debounce = () => {
		clearTimeout(timer);
		timer = setTimeout(() => save(), 500);
	};
</script>

<div>
	{#if editing}
		<input type="text" on:blur={() => (editing = false)} use:focus bind:value={answerText} on:input={debounce}/>
	{:else}
		<p on:dblclick={() => (editing = true)} id="answerLine">
			{answerText}
		</p>
	{/if}
</div>

<style>
	#answerLine:hover {
		text-decoration: underline solid gray 1px;
		text-underline-offset: 0.25rem;
	}
</style>
