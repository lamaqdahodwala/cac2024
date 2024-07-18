<script lang="ts">
	export let answerId: number;
	export let answerText: string;
	let editing = false;

	function focus(el: HTMLInputElement) {
		el.focus();
	}

	async function save() {
		await fetch('/api/updateAnswerContent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				newAnswerContent: answerText,
				answerId: answerId
			})
		});
	}

	let timer: number | undefined;
	const debounce = () => {
		clearTimeout(timer);
		timer = setTimeout(() => save(), 500);
	};
</script>

<div>
	{#if editing}
		<form on:submit|preventDefault={() => (editing = false)}>
			<input
				type="text"
				on:blur={() => (editing = false)}
				use:focus
				bind:value={answerText}
				on:input={debounce}
			/>
		</form>
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
