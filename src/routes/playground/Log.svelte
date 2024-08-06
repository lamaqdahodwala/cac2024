<script lang="ts">
	import { tick } from 'svelte';

	let messages: string[] = [];
	export function appendToLog(newText: string) {
    let now = new Date()

		messages = [...messages, `${now.toLocaleTimeString()} - ${ newText }`];

		tick().then(() => {
			container.scroll({
				top: container.scrollHeight,
				behavior: 'smooth'
			});
		});
	}

	export function clearLog() {
		messages = [];
	}

	let container: HTMLDivElement;
</script>

<div id="logContainer" bind:this={container}>
	<div id="messages">
		{#each messages as i}
			<p>{i}</p>
      <hr/>
		{/each}
	</div>
</div>
<button on:click={() => appendToLog('hello world')}>Add to log</button>

<style>
	textarea {
		width: 100%;
	}

	#messages {
		position: absolute;
		top: 0px;
	}

	#logContainer {
		position: relative;
		height: 100%;
		overflow-y: auto;
	}
</style>
