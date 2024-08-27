<script lang="ts">
	import type { PageData } from './$types';
	import LessonsSidebar from './[lessonId]/LessonsSidebar.svelte';
	export let data: PageData;
</script>

<br><br>

<div class="container">
	<div class="columns">
		<div class="is-2">
			<LessonsSidebar courseId={data.courseId} />
		</div>
	</div>
</div>
