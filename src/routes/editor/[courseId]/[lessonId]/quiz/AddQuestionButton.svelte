<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let quizId: number;

	let dispatch = createEventDispatcher();
	async function createQuestion() {
		await fetch('/api/addQuestionToQuiz', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				quizId
			})
		});
		dispatch('questionAdded');
	}
</script>

<button class="button is-primary" on:click={createQuestion}>Add Question</button>
