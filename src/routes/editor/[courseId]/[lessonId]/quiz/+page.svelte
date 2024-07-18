<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { PageData } from './$types';
	import AddQuestionButton from './AddQuestionButton.svelte';
	import QuestionEditor from './QuestionEditor.svelte';
	export let data: PageData;

	function refetchLoadData() {
		invalidate(() => true);
	}
</script>

{#each data.quiz.questions as i}
	<div class="my-6">
		<QuestionEditor question={i} on:answerAdded={refetchLoadData} />
	</div>
{/each}

<AddQuestionButton on:questionAdded={refetchLoadData} quizId={Number(data.quiz.id)}
></AddQuestionButton>
