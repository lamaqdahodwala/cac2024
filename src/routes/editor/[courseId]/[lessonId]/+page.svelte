<script lang="ts">
	import { setContext } from 'svelte';
	import MarkdownTextInput from '../../MarkdownTextInput.svelte';
	import LessonsSidebar from './LessonsSidebar.svelte';
	import QuizAddButton from './QuizAddButton.svelte';
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;

	$: text = data.textContent.text;
	$: title = data.textContent.lessonName;

	setContext('courseId', data.courseId);
	setContext('lessonId', data.lessonId);
</script>

<p class="title is-2">{title}</p>
<QuizAddButton hasQuizAlready={false}></QuizAddButton>
<MarkdownTextInput bind:rawContent={text} lessonId={data.lessonId} />
