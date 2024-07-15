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

	function shuffleList(array: any[]) {
		function pickRandomIndex(array: any[]) {
			return Math.floor(Math.random() * array.length);
		}

		let arr = array;
		let newArray = [];

		function addRandomItemToArray(arr: any[], newArray: any[]) {
			let randomIndex = pickRandomIndex(arr);
			let removedElement = arr[randomIndex];
			if (newArray.includes(removedElement)) {
				return addRandomItemToArray(arr, newArray);
			}
			newArray.push(removedElement);
		}

		let arrayLength = arr.length;
		for (let index = 0; index < arrayLength; index++) {
			addRandomItemToArray(array, newArray);
		}

		return newArray;
	}

	$: shuffledAnswers = shuffleList(question.answers);
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
