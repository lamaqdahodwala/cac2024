<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let answerId: number;
	export let answerText: string;
	let editing = false;
	let dispatch = createEventDispatcher();

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

	async function deleteAnswerChoice() {
		await fetch('/api/deleteAnswer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				answerId: answerId
			})
		});
		dispatch('answerDeleted');
	}
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
		<div class="dropdown is-hoverable">
			<p on:dblclick={() => (editing = true)} id="answerLine" class="dropdown-trigger">
				{answerText}
			</p>
			<div class="dropdown-menu">
				<div class="dropdown-content">
					<div class="columns">
						<button class="button is-small column" on:click={() => (editing = true)}>Edit</button>
						<button class="button is-small column p-3" on:click={deleteAnswerChoice}>Delete</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	#answerLine:hover {
		text-decoration: underline solid gray 1px;
		text-underline-offset: 0.25rem;
	}
</style>
