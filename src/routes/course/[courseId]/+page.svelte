<script lang="ts">
	import type { PageData } from './$types';
	import LessonCard from './LessonCard.svelte';
	export let data: PageData;
</script>

<div class="container">
	<div class="box">
		<p class="title is-1">{data.courseInfo.title}</p>
    <p>{data.percentCompleted}% completion</p>
		<p class="subtitle is-6 has-text-weight-light mt-4">By: {data.courseInfo.writer.name}</p>
	</div>

	<p>{data.courseInfo.description}</p>
	<hr />
	<h1 class="title is-4 has-text-centered">
    {#if data.nextLesson}
		<a
			href="/course/{data.courseInfo.id}/lesson/{data.nextLesson.id}"
			class="button is-large is-primary is-inverted is-fullwidth"
			>Next up for you: {data.nextLesson.title}</a
		>
    {:else} 
      <p class="button is-large is-primary is-inverted is-fullwidth">All lessons finished! </p>
    {/if}
	</h1>
	<div class="fixed-grid has-4-cols gap-5">
		<div class="grid">
			{#each data.lessons as lesson}
        <LessonCard lesson={lesson}/>
			{/each}
		</div>
	</div>
</div>
