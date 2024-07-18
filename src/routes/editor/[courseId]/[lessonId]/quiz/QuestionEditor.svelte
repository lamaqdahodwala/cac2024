<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import AnswerEditor from './AnswerEditor.svelte';

  let dispatch = createEventDispatcher()
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

	async function addAnswer() {
		await fetch('/api/addAnswerToQuestion', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				questionId: question.id
			})
		});

    dispatch("answerAdded")
	}

  async function deleteQuestion(){
    await fetch("/api/deleteQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        questionId: question.id
      })
    })
  }

	let questionText = question.question;
</script>

<div class="field">
  <button class="button is-danger is-inverted is-small m-1">Delete</button>
	<input class="input" bind:value={questionText} on:input={debounceSave} />
	{#each question.answers as answer}
		<p class="is-flex is-flex-direction-row is-gap-1">
			<input
				type="radio"
				value={answer.id}
				bind:group={correctAnswer}
				name="isCorrect{question.id}"
				class="checkbox"
				checked={answer.id === correctAnswer.id}
				on:change={() => updateCorrectAnswer(correctAnswer)}
			/>
			<AnswerEditor answerId={Number(answer.id)} answerText={answer.answerText} on:answerDeleted={() => dispatch("answerAdded")}/>
		</p>
	{/each}
	<button class="button is-small is-ghost" on:click={addAnswer}>Add Answer</button>
</div>
