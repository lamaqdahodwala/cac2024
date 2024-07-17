<script lang="ts">
	export let answerId: number;
	export let answerText: string;
	let hovering = false;
</script>

<div on:mouseover={() => (hovering = true)} on:mouseout={() => (hovering = false)}>
  <div>
    {answerText}
    {#if hovering}
      <button>Edit</button>
    {/if}
  </div>
</div>
