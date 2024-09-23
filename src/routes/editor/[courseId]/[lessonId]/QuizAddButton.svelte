<script lang="ts">
	import { invalidateAll } from "$app/navigation";
  import {page} from '$app/stores'

  export let lessonId: number
  export let hasQuizAlready: boolean = false
  async function createQuiz(){
    await fetch("/api/addQuizToLesson", {
      method: "POST", 
      body: JSON.stringify({
        lessonId: lessonId
      })
    })
    invalidateAll()
  }

  let here = $page.url.pathname

</script>

{#if hasQuizAlready}
  <a href={ here + "/quiz" } class="button is-info">Edit Quiz</a>
{:else}
  <button class="button is-info is-outlined" on:click={createQuiz}>Create Quiz</button>
{/if}
