<script lang="ts">
  import {page} from '$app/stores'

	export let hasExerciseAlready: boolean = false;
  export let lessonId: number

  let here = $page.url.pathname

  async function createExercise(){
    await fetch("/api/addExerciseToLesson", {
      method: "POST", 
      body: JSON.stringify({
        lessonId: lessonId
      }),
    })
  }
</script>

{#if hasExerciseAlready}
  <a href={ here + "/exercise"} class="button is-primary">Edit Exercise</a>
{:else} 
  <button class="button is-primary is-outlined" on:click={createExercise}>Create Exercise</button>
{/if}
