<script lang="ts">
	import { getContext } from 'svelte';
	import Question from './Question.svelte';
	import LessonAddButton from '../../../../editor/[courseId]/[lessonId]/LessonAddButton.svelte';
	import Page from './+page.svelte';

	type Question = {
		question: String;
	};

	let modalOpen = false;
	let id = getContext('lessonId');

	let numQuestions = 0;
	let quizId: number;

	async function getQuiz() {
		let res = await fetch(`/api/getQuizQuestions?lessonId=${id}`);

		let json = await res.json();

		numQuestions = json.quiz.questions.length;
		quizId = json.quiz.id;

		let hasCompletedQuiz = await (
			await fetch(`/api/hasCompletedQuizForLesson?lessonId=${id}`)
		).json();

		return {
      quiz: json.quiz, 
      hasCompletedQuiz
    };
	}

	function reset() {
		window.location.reload();
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

	let questionResponses: number[] = [];

	function calculateScore(totalQuestions: number) {
		let questionsCorrect = 0;
		for (let i of questionResponses) {
			questionsCorrect += i;
		}

		return Math.floor((questionsCorrect / totalQuestions) * 100);
	}

	function addResponse(e: CustomEvent<any>) {
		let isCorrect = e.detail.isCorrect;
		questionResponses = [...questionResponses, Number(isCorrect)];
	}

	function upload() {
		fetch('/api/uploadQuizScore', {
			method: 'POST',
			body: JSON.stringify({
				lessonId: quizId
			})
		});
		modalOpen = false;
	}
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
						<Question {question} on:answer={(e) => addResponse(e)}></Question>
						<hr />
					{/each}

					{#if questionResponses.length !== numQuestions}
						<p>Complete all questions to submit</p>
					{:else if calculateScore(numQuestions) < 80}
						<p>Your score must be at least 80% to submit.</p>
						<p>Your score: {calculateScore(numQuestions)}%</p>
						<button class="button is-warning" on:click={reset}>Retry</button>
					{:else}
						<button class="button is-primary" on:click={upload}>Submit Quiz</button>
					{/if}
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

		<button class="button is-primary {data.hasCompletedQuiz ? 'is-inverted' : ''}" on:click={() => (modalOpen = !modalOpen)} data-target="modal">
			{#if data.hasCompletedQuiz}
				Retake Quiz
			{:else}
				Take Quiz
			{/if}
		</button>
	{/if}
{/await}
