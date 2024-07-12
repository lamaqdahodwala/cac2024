<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="m-5">
	<div class="box">
		<p class="title is-2">{data.lesson.lessonName}</p>
	</div>
	<hr />
	<div class="content is-size-5">
		{@html data.lesson.textContent}
	</div>
</div>
