<script lang="ts">
	import type { PageData } from "./$types";
	import CreateCourseButton from "./CreateCourseButton.svelte";

  export let data: PageData
</script>
<div class="fixed-grid has-2-cols container">
<div class="grid">
{#each data.courses as course} 
  <div class="box cell my-4">
    <div class="flex is-flex-row is-justify-content-between">
      <a href="/editor/{course.id}" class="is-size-4 has-text-weight-bold">{course.title}</a>
      <p>{course._count.lessons} lessons</p>
    </div>
    <hr class="my-3">
      {#if course.description}
      <div>{course.description}</div>
        {:else}
          <br>
      {/if}
  </div>
{:else}
  <p>No courses</p>
{/each}</div>
</div>
<CreateCourseButton></CreateCourseButton>
