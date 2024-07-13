<script lang="ts">
	import { getContext } from 'svelte';
	import Question from './Question.svelte';

	type Question = {
		question: String;
	};
	export let questions;

	let modalOpen = false;
	let id = getContext('lessonId');

	async function getQuiz() {
		let res = await fetch(`/api/getQuizQuestions?lessonId=${id}`);

		let json = await res.json();

		return json;
	}
</script>

{#await getQuiz() then data}
	{#if data.quiz}
		<div class="modal {modalOpen ? 'is-active' : ''}" id="modal">
			<div class="modal-background" on:click={() => (modalOpen = !modalOpen)}></div>
			<div class="modal-content">
				<div class="box">
					{#each data.quiz.questions as question}
						<Question {question} />
					{/each}
				</div>
			</div>
		</div>

		<button class="button is-primary" on:click={() => (modalOpen = !modalOpen)} data-target="modal"
			>Take Quiz</button
		>
	{/if}
{/await}
