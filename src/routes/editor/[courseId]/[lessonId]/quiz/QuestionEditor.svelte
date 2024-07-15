<script lang="ts">
	export let question: {
		question: string;
		id: string;
		answers: {
			id: string;
			answerText: string;
			isCorrect: string;
		}[];
	};

	function getCorrectAnswer() {
		let correctIndex = question.answers.findIndex((value) => value.isCorrect);
		return question.answers[correctIndex].id;
	}

	let correctAnswer: any = getCorrectAnswer();

	let timer: number | undefined;
	const debounceSave = () => {
		clearTimeout(timer);
		timer = setTimeout(() => updateQuestionText(), 500);
	};

	async function updateQuestionText() {
		await fetch('/api/updateQuestionText', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				questionId: question.id,
				newText: questionText
			})
		});
	}

	async function updateCorrectAnswer(correctAnswer) {
		await fetch('/api/changeCorrectAnswer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				questionId: question.id,
				correctAnswerId: correctAnswer
			})
		});
	}

	let questionText = question.question;
</script>

<div class="field">
	<input class="input" bind:value={questionText} on:input={debounceSave} />
	{#each question.answers as answer}
		<p>
			<input
				type="radio"
				value={answer.id}
				bind:group={correctAnswer}
				name="isCorrect{question.id}"
				class="checkbox"
				checked={answer.id === correctAnswer.id}
				on:change={() => updateCorrectAnswer(correctAnswer)}
			/>{answer.answerText}
		</p>
	{/each}
</div>
