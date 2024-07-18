<script lang="ts">
	import { getContext } from 'svelte';
	import Question from './Question.svelte';

	type Question = {
		question: String;
	};

	let modalOpen = false;
	let id = getContext('lessonId');

	let numQuestions = 0;

	async function getQuiz() {
		let res = await fetch(`/api/getQuizQuestions?lessonId=${id}`);

		let json = await res.json();

		numQuestions = json.quiz.questions.length - 1;

		return json;
	}

	function incrementPageNumber() {
		if (pageNumber + 1 > numQuestions) return;
		pageNumber = pageNumber + 1;
	}

	function decrementPageNumber() {
		if (pageNumber - 1 < 0) return;
		pageNumber = pageNumber - 1;
	}
	let pageNumber = 0;
</script>

{#await getQuiz() then data}
	{#if data.quiz}
		<div class="modal {modalOpen ? 'is-active' : ''}" id="modal">
			<div class="modal-background" on:click={() => (modalOpen = !modalOpen)}></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Quiz</p>
					<button class="delete" aria-label="close" on:click={() => (modalOpen = !modalOpen)}
					></button>
				</header>

				<div class="modal-card-body">
          {#each data.quiz.questions as question}
            <Question {question}></Question>
            <hr>
          {/each}
				</div>

				<!-- <div class="modal-card-foot"> -->
				<!-- 	<div class="columns"> -->
				<!-- 		<div class="column"> -->
				<!-- 			<button class="button" on:click={decrementPageNumber}>Previous</button> -->
				<!-- 		</div> -->
				<!-- 		<div class="column"> -->
				<!-- 			<button class="button" on:click={incrementPageNumber}>Next</button> -->
				<!-- 		</div> -->
				<!-- 	</div> -->
				<!-- </div> -->
			</div>
		</div>

		<button class="button is-primary" on:click={() => (modalOpen = !modalOpen)} data-target="modal"
			>Take Quiz</button
		>
	{/if}
{/await}
