<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import type { PageData } from './$types';
	import Quizzer from './Quizzer.svelte';
	import { setContext } from 'svelte';
	import { page } from '$app/stores';
	export let data: PageData;
	let bottomDiv: HTMLDivElement;

	async function markAsRead() {
		await fetch('/api/markLessonAsCompleted', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				lessonId: data.lesson.id
			})
		});
	}

	setContext('lessonId', data.lesson.id);

  let here = $page.url.pathname
</script>

<div class="m-5">
	<div class="box">
		<p class="title is-2">{data.lesson.lessonName}</p>
	</div>
	<hr />
	<div class="content is-size-5">
		{@html data.lesson.textContent}
	</div>
	<IntersectionObserver element={bottomDiv} let:intersecting on:observe={markAsRead}
	></IntersectionObserver>

	<div id="bottom" bind:this={bottomDiv}></div>
	<Quizzer />

  {#if data.lesson.hasExercise}
    <a href={here + "/exercise"} class="button is-info is-inverted">Interactive Exercise</a>
  {/if}
</div>
