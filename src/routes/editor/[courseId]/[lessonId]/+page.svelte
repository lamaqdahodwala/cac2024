<script lang="ts">
	import { setContext } from 'svelte';
	import MarkdownTextInput from './MarkdownTextInput.svelte';
	import LessonsSidebar from './LessonsSidebar.svelte';
	import QuizAddButton from './QuizAddButton.svelte';
	import type { PageData } from './$types';
	import ExerciseAddButton from './ExerciseAddButton.svelte';

	export let data: PageData;

	$: text = data.textContent.textContent;
	$: title = data.textContent.lessonName;
	$: lessonId = data.lessonId;
  $: hasQuizAlready = data.hasQuizAlready

	setContext('courseId', data.courseId);
	setContext('lessonId', data.lessonId);
</script>

<p class="title is-2">{title}</p>
<div class="columns">
<div class="column is-one-quarter">
<QuizAddButton hasQuizAlready={hasQuizAlready} lessonId={Number(data.lessonId)}></QuizAddButton></div>
<div class="column">
<ExerciseAddButton lessonId={Number( lessonId )}/></div>
</div>
<MarkdownTextInput initContent={text} lessonId={data.lessonId} />
