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

  function getCorrectAnswer(){
    let correctIndex = question.answers.findIndex((value) => value.isCorrect)
    return question.answers[correctIndex].id
  }

	let correctAnswer: any = getCorrectAnswer()  

	function updateCorrectAnswer(correctAnswer) {
    console.log("updating")
  }

	$: updateCorrectAnswer(correctAnswer);
</script>

<div class="field">
	<input class="input" value={question.question} />
	{#each question.answers as answer}
		<p>
			<input
				type="radio"
				value={answer.id}
				bind:group={correctAnswer}
				name="isCorrect{question.id}"
				class="checkbox"
        checked={answer.id === correctAnswer.id}
			/>{answer.answerText}
		</p>
	{/each}
</div>
