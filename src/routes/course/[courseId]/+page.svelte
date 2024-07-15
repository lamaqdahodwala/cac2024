<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="container">
	<div class="box">
		<p class="title is-1">{data.courseInfo.title}</p>
		<p class="subtitle is-6 has-text-weight-light mt-4">By: {data.courseInfo.writer.name}</p>
	</div>

	<p>{data.courseInfo.description}</p>
	<hr />
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
