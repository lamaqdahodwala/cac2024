<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';
	import { goto, invalidateAll } from '$app/navigation';
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

{#await fetcher then data}
	<div class="menu">
    <a href="/editor/" class="">View All Courses</a>
    <p class="title is-6">{data.course.title}</p>
		<p class="menu-label">Lessons</p>
		<div>
			{#each data.lessons as lesson}
				<ul class="menu-list">
					<li>
						<a href={`/editor/${courseId}/${lesson.id}`} on:click={invalidateAll}>{lesson.title}</a>
					</li>
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
	</div>
{/await}
