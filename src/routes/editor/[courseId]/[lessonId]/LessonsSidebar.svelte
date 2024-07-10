<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';

	export let courseId: number;
	async function getAllLessons() {
		let res = await fetch(`/api/getAllLessonsInCourse?courseId=${courseId}`);

		let json = await res.json();

		return json;
	}

	let fetcher = getAllLessons();

	let dispatch = createEventDispatcher();

	async function navigate(lessonId) {
		await goto(`/editor/${courseId}/${lessonId}`);
		dispatch('navigate');
	}
</script>

<div class="menu">
	<p class="menu-label">Lessons</p>
	{#await fetcher then data}
		<div class="menu-list">
			{#each data as lesson}
				<p>
					<button class="link" on:click={() => navigate(lesson.id)}>{lesson.title}</button>
				</p>
			{/each}
		</div>
	{/await}
</div>
