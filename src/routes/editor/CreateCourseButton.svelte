<script lang="ts">
	import { invalidate, invalidateAll } from "$app/navigation";

	let isCreatingCourse = false;
	let courseName: string;

  async function createCourse(){
    await fetch("/api/createCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        courseTitle: courseName
      })
    })

    invalidateAll()
  }
</script>

<button class="button is-outline my-2" on:click={() => (isCreatingCourse = !isCreatingCourse)}
	>Create Course</button
>
<div class="">
	{#if isCreatingCourse}
		<form on:submit|preventDefault={createCourse}>
			<label for="">
				Course title
				<input type="text" class="input" bind:value={courseName} />
			</label>

      <button class="button is-primary">Create</button>
		</form>
	{/if}
</div>
