<script lang="ts">
	import { tick } from 'svelte';

	interface Message {
		time: string;
		messageContent: string;
		isError: boolean;
		isSystemLog: boolean;
	}

	let messages: Message[] = [];

	export function appendSystemLog(newText: string) {
		appendObjectToLog({
			isSystemLog: true,
			isError: false,
			messageContent: newText
		});
	}

	function appendObjectToLog(object: Omit<Message, 'time'>) {
		let now = new Date();
		messages = [
			...messages,
			{
				...object,
				time: now.toLocaleTimeString()
			}
		];

		tick().then(() => {
			container.scroll({
				top: container.scrollHeight,
				behavior: 'smooth'
			});
		});
	}

	export function appendErrorToLog(error: string) {}
	export function appendToLog(newText: string) {
		appendObjectToLog({
			isSystemLog: false,
			isError: false,
			messageContent: newText,
		});
	}

	function renderMessageAsString(message: Message) {
		return `${message.time} - ${message.messageContent}`;
	}

	export function clearLog() {
		messages = [];
	}

	let container: HTMLDivElement;
</script>

<div id="logContainer" bind:this={container}>
	<div id="messages">
		{#each messages as i}
			{#if i.isError}
				<p class="is-family-monospace has-background-danger">{renderMessageAsString(i)}</p>
			{:else if i.isSystemLog}
				<p class="is-family-monospace has-text-grey-light">{renderMessageAsString(i)}</p>
			{:else}
				<p class="is-family-monospace has-text-black">{renderMessageAsString(i)}</p>
			{/if}
		{/each}
	</div>
</div>

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
		height: 95%;
		width: 48rem;
		overflow-y: auto;
	}
</style>
