<script lang="ts">
	import type { PageData } from "./$types";
	import CreateCourseButton from "./CreateCourseButton.svelte";

  export let data: PageData
</script>

{#each data.courses as course} 
  <p>{JSON.stringify(course)}</p>
{:else}
  <p>No courses</p>
{/each}

<CreateCourseButton></CreateCourseButton>
