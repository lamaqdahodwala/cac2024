<script lang="ts">
	export let lesson: { id: number; title: string; courseId: string; description: string };

	let hasCompletedQuiz = false;
	let doesQuizExist = false;
	let hasCompletedExercise = false;

	async function findOutIfHasQuiz() {
		let res = await fetch(`/api/hasCompletedQuizForLesson?lessonId=${lesson.id}`);

		let json = await res.json();

		hasCompletedQuiz = json.hasCompletedQuiz;

		if (hasCompletedQuiz !== null) {
			doesQuizExist = true;
		}
	}
</script>

<div class="card">
	<div class="card-content">
		<div class="media-content">
			<p class="title is-4">{lesson.title}</p>
		</div>
		<p>{lesson.description}</p>
		{#await findOutIfHasQuiz() then data}
			{#if doesQuizExist}
				{#if hasCompletedQuiz}
					<p class="has-text-success">Quiz completed</p>
				{:else}
					<p class="has-text-warning">Quiz not completed</p>
				{/if}
			{/if}
		{/await}
	</div>

	<footer class="card-footer">
		<a
			href="/course/{lesson.courseId}/lesson/{lesson.id}"
			class="card-footer-item has-text-weight-bold">Read</a
		>
	</footer>
</div>
