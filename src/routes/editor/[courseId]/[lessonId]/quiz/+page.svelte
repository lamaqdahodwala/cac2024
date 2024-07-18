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
	<QuestionEditor question={i} />
{/each}

<AddQuestionButton on:questionAdded={refetchLoadData} quizId={Number(data.quiz.id)}
></AddQuestionButton>
