<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';
	import { goto } from '$app/navigation';
	import LessonAddButton from './LessonAddButton.svelte';

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

  setContext("courseId", courseId)
</script>

<div class="menu">
	<p class="menu-label">Lessons</p>
	{#await fetcher then data}
		<div class="menu-list">
			{#each data as lesson}
				<p>
					<button on:click={() => navigate(lesson.id)}>{lesson.title}</button>
				</p>
			{/each}
		</div>

		<LessonAddButton on:lessonCreated={(e) => navigate(e.detail.lessonId)} />
	{/await}
</div>
