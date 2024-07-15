<script lang="ts">
	import { setContext } from 'svelte';
	import MarkdownTextInput from '../../MarkdownTextInput.svelte';
	import type { PageData } from './$types';
	import LessonsSidebar from './LessonsSidebar.svelte';

	export let data: { lessonId: string; courseId: string };

	let text = '';
	let title = '';

	async function getExistingData() {
		let res = await fetch(`/api/getLessonContent?lessonId=${data.lessonId}`);
		let json = await res.json();
		text = json.textContent;
		title = json.lessonName;
	}

	let fetcher = getExistingData();

	function refetch() {
		fetcher = getExistingData();
	}

	setContext('courseId', data.courseId);
	setContext('lessonId', data.lessonId);
</script>

<br /><br />
{#await fetcher then}
	<div class="container">
		<div class="columns">
			<div class="is-2 column is-fixed">
				<LessonsSidebar courseId={Number(data.courseId)} on:navigate={refetch} />
			</div>
			<div class="is-expanded is-offset-2 column">
				<p class="title is-2">{title}</p>
				<MarkdownTextInput bind:rawContent={text} lessonId={data.lessonId} />
			</div>
		</div>
	</div>
{/await}
