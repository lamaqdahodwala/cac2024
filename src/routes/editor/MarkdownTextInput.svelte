<script lang="ts">
	import { marked } from 'marked';

	export let rawContent = '';
	export let lessonId: string;

	async function save() {
		await fetch('/api/updateLessonContent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				lessonId: lessonId,
				newContent: rawContent
			})
		});
	}

  let timer: number | undefined
	const debounce = (e: Event) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
      save()
		}, 500);
	};
</script>

<textarea
	class="textarea"
	placeholder="Type your lesson here..."
	bind:value={rawContent}
  on:input={debounce}
></textarea>

<hr />

<div class="content">
	{@html marked(rawContent)}
</div>
