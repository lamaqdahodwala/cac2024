<script lang="ts">
	import QuestionEditor from './QuestionEditor.svelte';
	export let data: PageData;
</script>

{#each data.quiz.questions as i}
	<QuestionEditor question={i} />
{/each}
