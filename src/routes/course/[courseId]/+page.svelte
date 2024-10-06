<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="container">
	<div class="box">
		<p class="title is-1">{data.courseInfo.title}</p>
    <p>{data.percentComplete}% completion</p>
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
				<div class="card">
					<div class="card-content">
						<div class="media-content">
							<p class="title is-4">{lesson.title}</p>
						</div>
						<p>{lesson.description}</p>
					</div>

					<footer class="card-footer">
						<a
							href="/course/{data.courseInfo.id}/lesson/{lesson.id}"
							class="card-footer-item has-text-weight-bold">Read</a
						>
					</footer>
				</div>
			{/each}
		</div>
	</div>
</div>
