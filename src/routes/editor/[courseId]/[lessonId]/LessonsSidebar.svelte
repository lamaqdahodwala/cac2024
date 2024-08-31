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

	setContext('courseId', courseId);
</script>

<div class="menu">
	<p class="menu-label">Lessons</p>
	{#await fetcher then data}
		<div>
			{#each data as lesson}
				<ul class="menu-list">
					<li><button on:click={() => navigate(lesson.id)}>{lesson.title}</button></li>
					<li>
						<ul>
              {#if data.quiz}
							  <p><li class="button is-ghost is-small">Quiz - {data.quiz._count.questions}</li></p>
              {/if}

              {#if data.exercise}
                <p>
                  <li class="button is-ghost is-small">Exercise</li>
                </p>
              {/if}
						</ul>
					</li>
				</ul>
			{/each}
		</div>

		<LessonAddButton on:lessonCreated={(e) => navigate(e.detail.lessonId)} />
	{/await}
</div>
