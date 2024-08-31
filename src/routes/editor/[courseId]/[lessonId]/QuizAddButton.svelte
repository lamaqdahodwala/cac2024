<script lang="ts">
  export let hasQuizAlready: boolean = false
</script>

{#if hasQuizAlready}
  <button class="button is-info">Edit Quiz</button>
{:else}
  <button class="button is-info is-outlined">Create Quiz</button>
{/if}
