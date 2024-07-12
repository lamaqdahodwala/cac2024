<script lang="ts">
	import { marked } from 'marked';

	export let rawContent = '';
	export let lessonId: string;
	let savingText = ' ';

	async function save() {
		savingText = 'Saving...';
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

		savingText = 'Saved';

		setTimeout(() => (savingText = ' '), 1000);
	}

	let timer: number | undefined;
	const debounce = (e: Event) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			save();
		}, 500);
	};
</script>

<div class="savingTextContainer has-text-gray is-size-6">
	{savingText}
</div>

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

<style>
	div.savingTextContainer {
		min-height: 2rem;
	}
</style>
