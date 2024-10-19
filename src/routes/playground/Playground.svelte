<script lang="ts">
	import * as Blockly from 'blockly';
	import { javascriptGenerator } from 'blockly/javascript';
	let workspace: Blockly.Workspace;
	import { onMount } from 'svelte';
	import { ToolboxCreator, type CustomCategory } from '$lib/abstract/BlocklyInterface';
	import { LoadingDataCategory } from '$lib/blocks/LoadingData';
	import { DataTransformationCategory } from '$lib/blocks/DataTransformation';
	import { DataCleaningCategory } from '$lib/blocks/DataCleaning';
	import { ModelTrainingCategory } from '$lib/blocks/ModelTraining';
	import { OptimizerCategory } from '$lib/blocks/Optimizers';
	import { OutputCategory } from '$lib/blocks/Output';
	import { LayersCategory } from '$lib/blocks/Layers';
	import { EventsCategory } from '$lib/blocks/Events';
	import { addPrebuiltBlocks } from '$lib/blocks/PrebuiltBlocks';
	import FileSystem from './FileSystem.svelte';
	import { CodeEvaluationBuilder, FunctionConstructorStrategy } from './CodeEval';
	import Log from './Log.svelte';
	import { MutatedCategory } from '$lib/blocks/Mutated';

	export let categories: CustomCategory[];
	export let instructions: string | null = null;
	export let passRequirement: string | null = null;

	let toolbox = new ToolboxCreator(categories);

	onMount(() => {
		workspace = Blockly.inject('test', {
			toolbox: addPrebuiltBlocks(toolbox.getCategoryToolboxObject(javascriptGenerator))
		});

		workspace.registerButtonCallback('CREATE_VARIABLE', () =>
			Blockly.Variables.createVariableButtonHandler(workspace)
		);
	});

	async function compileCode() {
		clearLog();
		appendSystemLog('Beginning Execution...');

		await new Promise((resolve) => setTimeout(resolve, 100));
		let code = javascriptGenerator.workspaceToCode(workspace);

		let evaluator = new CodeEvaluationBuilder();
		evaluator.withCode(code);
		evaluator.withContext({
			dfd: import('danfojs/dist/danfojs-browser/src'),
			getFileByName,
			appendToLog,
			clearLog,
			tf: import('@tensorflow/tfjs'),
			appendErrorToLog
		});
		evaluator.wrapCodeAsync();
		evaluator.withExecStrategy(FunctionConstructorStrategy);
		evaluator.overrideConsoleLog('appendToLog');
		evaluator.run();
	}

	let getFileByName: (fileName: string) => File | null;
	let appendToLog: (text: string) => void;
	let clearLog: () => void;
	let appendSystemLog: (text: string) => void;
	let appendErrorToLog: (error: string) => void;

	let instructionsModalOpen = false;
</script>

<br />
<button on:click={compileCode}>Run code</button>
{#if instructions}
	<button on:click={() => (instructionsModalOpen = !instructionsModalOpen)}
		>View Instructions</button
	>

	<div class="dropdown {instructionsModalOpen ? 'is-active' : ''}">
		<div class="dropdown-menu" id="dropdown-menu2" role="menu">
			<div class="dropdown-content p-3">
				<div class="dropdown-item">
					<strong>
						{instructions}
					</strong>
				</div>
				<hr class="dropdown-divider my-3" />
				<div class="dropdown-item">
					<p>Pass requirement: {passRequirement}%</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<div class="columns">
	<div id="test" style="height: 750px; width: 800px;"></div>
	<div class="" id="devToolsContainer">
		<FileSystem bind:getFileByName />
		<Log bind:appendToLog bind:clearLog bind:appendSystemLog bind:appendErrorToLog />
	</div>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		font-family: 'Poppins', sans-serif;
		margin: 0;
		padding: 0;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		background-attachment: fixed;
		min-height: 100vh;
		position: relative;
		overflow-x: hidden;
	}
	button {
		background-color: #3e8ed0;
		color: white;
		padding: 10px 20px;
		border: none;
		border-radius: 15px;
		cursor: pointer;
		font-size: 16px;
		transition: background-color 0.3s ease;
		margin-left: 20px;
	}
	button:hover {
		background-color: #3273dc;
	}
	.columns {
		display: flex;
		margin-top: 20px;
		justify-content: space-between;
		gap: 20px;
	}
	#test,
	#devToolsContainer {
		flex: 1;
		height: 750px;
		background-color: #fff;
		border: 2px solid #ddd;
		border-radius: 10px;
		padding: 20px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		margin-left: 20px;
		margin-right: 20px;
	}
</style>
