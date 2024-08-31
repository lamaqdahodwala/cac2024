<script lang="ts">
	import { invalidate, invalidateAll } from "$app/navigation";

	let isCreatingCourse = false;
	let courseName: string;
  let description: string = ""

  async function createCourse(){
    await fetch("/api/createCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        courseTitle: courseName,
        description: description
      })
    })

    invalidateAll()
  }
</script>

<button class="button is-outline my-2" on:click={() => (isCreatingCourse = !isCreatingCourse)}
	>Create Course</button
>
<div class="container">
	{#if isCreatingCourse}
		<form on:submit|preventDefault={createCourse}>
			<label for="" class="has-text-weight-bold">
				Course title
				<input type="text" class="input" bind:value={courseName} />
			</label>

      <label for="">
        Description (optional)
        <input type="text" class="input" bind:value={description}>
      </label>

      <button class="button is-primary">Create</button>
		</form>
	{/if}
</div>
