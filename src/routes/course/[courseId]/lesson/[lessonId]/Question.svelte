<script lang="ts">
	type Question = {
		id: string;
		question: string;
		answers: {
			id: string;
			answerText: string;
		}[];
	};
	export let question: Question;

	let userHasAnswered = false;
	let isCorrect: boolean;
	let incorrectAnswerExplanation: string;

	async function submitAnswerChoice(answerId: string) {
		userHasAnswered = true;
		let res = await fetch('/api/scoreQuestion', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				questionId: question.id,
				chosenAnswerId: answerId
			})
		});
		let json = await res.json();

		isCorrect = json.isUserCorrect;
		incorrectAnswerExplanation = json.incorrectAnswerExplanation;
	}
</script>

<p class="subtitle is-4">{question.question}</p>

{#each question.answers as answerChoice}
	<button
		class="button"
		on:click={() => submitAnswerChoice(answerChoice.id)}
		disabled={userHasAnswered}>{answerChoice.answerText}</button
	>
{/each}

{#if isCorrect !== undefined}
	<div class="message {isCorrect ? 'is-success' : 'is-danger'} is-small">
		<div class="message-header">
			{#if isCorrect}
				<p>Correct!</p>
			{:else}
				<p>Incorrect</p>
			{/if}
		</div>

		<div class="message-body">
			{incorrectAnswerExplanation}
		</div>
	</div>
{/if}

<br />
