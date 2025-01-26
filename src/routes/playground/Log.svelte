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

	export function appendErrorToLog(error: string) {
		appendObjectToLog({
			isSystemLog: false, 
			isError: true, 
			messageContent: error
		});
	}

	export function appendToLog(newText: string | { columns: string[], values: any[][] } | any) {
		let messageContent: string;
		if (typeof newText === 'object') {
			if (newText.columns && newText.values) {
				messageContent = formatDataFrame({
					columns: newText.columns,
					values: newText.values
				});
			} else if (newText.toJSON) {
				const dfJSON = newText.toJSON();
				messageContent = formatDataFrame({
					columns: dfJSON.columns,
					values: dfJSON.data
				});
			} else {
				messageContent = JSON.stringify(newText, null, 2);
			}
		} else {
			messageContent = newText as string;
		}
		appendObjectToLog({
			isSystemLog: false,
			isError: false,
			messageContent: messageContent,
		});
	}

	function formatDataFrame(df: { columns: string[], values: any[][] }): string {
		const headers = df.columns;
		const rows = df.values;
		const columnWidths = headers.map(header => header.length);
		rows.forEach(row => {
			row.forEach((cell, index) => {
				const cellLength = String(cell).length;
				if (cellLength > columnWidths[index]) {
					columnWidths[index] = cellLength;
				}
			});
		});
		const formattedHeaders = headers.map((header, index) => header.padEnd(columnWidths[index])).join(' | ');
		const formattedRows = rows.map(row => row.map((cell, index) => String(cell).padEnd(columnWidths[index])).join(' | ')).join('\n');
		return `${formattedHeaders}\n${formattedRows}`;
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
				<p class="is-family-monospace has-background-danger-dark has-text-danger">{renderMessageAsString(i)}</p>
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
    overflow-y: auto;
	}
	#logContainer {
		position: relative;
		height: 95%;
		width: 48rem;
		overflow-y: auto;
	}
	.is-family-monospace {
		font-family: monospace;
		white-space: pre;
		overflow-x: auto;
		max-width: 100%;
		display: block;
	}
	#messages p {
		overflow-x: auto;
		max-width: 100%;
		padding-bottom: 5px;
	}
	#messages p::-webkit-scrollbar {
		height: 8px;
	}
	#messages p::-webkit-scrollbar-track {
		background: #f1f1f1;
	}
	#messages p::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 4px;
	}
	#messages p::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
