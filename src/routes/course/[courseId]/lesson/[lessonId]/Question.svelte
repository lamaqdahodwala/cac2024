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

	function shuffleList(arr: any[]) {
		function pickRandomIndex(array: any[]) {
			return Math.floor(Math.random() * array.length);
		}

		let newArray = [];

    let arrayLength = arr.length
		for (let index = 0; index < arrayLength; index++) {
			let randomIndex = pickRandomIndex(arr);
			let removedElement = arr.splice(randomIndex, 1);
			newArray.push(removedElement[0]);
		}

    return newArray
	}

  let shuffledAnswers = shuffleList(question.answers)
</script>

<p class="subtitle is-4">{question.question}</p>

{#each shuffledAnswers as answerChoice}
	<button
		class="button"
		on:click={() => submitAnswerChoice(answerChoice.id)}
		disabled={userHasAnswered}>{answerChoice.answerText}</button
	>
{/each}

{#if isCorrect !== undefined}
	<div class="message {isCorrect ? 'is-success' : 'is-danger'} is-small mt-6">
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
