<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { LayoutData } from './$types';
	import LessonsSidebar from './[lessonId]/LessonsSidebar.svelte';

	export let data: LayoutData;
</script>

<br /><br />
<div class="columns container">
	<div class="is-one-quarter mx-6 column">
		<LessonsSidebar courseId={data.courseId} on:navigate={invalidateAll} />
	</div>
	<div class="column">
		<slot />
	</div>
</div>
