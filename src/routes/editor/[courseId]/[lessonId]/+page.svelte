<script lang="ts">
	import { setContext } from 'svelte';
	import MarkdownTextInput from './MarkdownTextInput.svelte';
	import LessonsSidebar from './LessonsSidebar.svelte';
	import QuizAddButton from './QuizAddButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: text = data.textContent.textContent;
	$: title = data.textContent.lessonName;
	$: lessonId = data.lessonId;
  $: hasQuizAlready = data.hasQuizAlready

	setContext('courseId', data.courseId);
	setContext('lessonId', data.lessonId);
</script>

<p class="title is-2">{title}</p>
<QuizAddButton hasQuizAlready={hasQuizAlready} lessonId={Number(data.lessonId)}></QuizAddButton>
<MarkdownTextInput initContent={text} lessonId={data.lessonId} />
