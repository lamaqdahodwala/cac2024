<script lang="ts">
	import { goto } from "$app/navigation";
	import { createEventDispatcher, getContext } from "svelte";

  let clicked: boolean = false

  let courseId = getContext("courseId")

  let dispatch = createEventDispatcher()

  async function saveLesson(){
    let res = await fetch("/api/addLessonToCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( {
        courseId,
        lessonName: title
      })
    })

    let json = await res.json()

    let lessonId = json.id

    dispatch("lessonCreated", {lessonId})
  }

  let title: string = ""

  function focus(el: HTMLInputElement){
    el.focus()
  }

</script>


<button class="button is-primary" on:click={() => clicked = !clicked}>Add Lesson</button>

{#if clicked}
  <form on:submit|preventDefault={saveLesson}>
    <p>Lesson Title:</p>
    <input type="text" class="input" bind:value={title} use:focus on:keyup|stopPropagation>
    <button type="submit">Create</button>
  </form>

{/if}
