<script lang="ts">
	import * as Blockly from 'blockly';
	import { javascriptGenerator } from 'blockly/javascript';
	let workspace: Blockly.Workspace | Blockly.WorkspaceSvg | undefined;
	import { onMount } from 'svelte';
	import { ToolboxCreator } from '$lib/abstract/BlocklyInterface';
	import { LoadingDataCategory } from '$lib/blocks/LoadingData';
	import { DataTransformationCategory } from '$lib/blocks/DataTransformation';
	import { DataCleaningCategory } from '$lib/blocks/DataCleaning';
	import { addPrebuiltBlocks } from '$lib/blocks/PrebuiltBlocks';
	import FileSystem from './FileSystem.svelte';
	// import * as dfd from 'danfojs/dist/danfojs-browser/src';
	import { CodeEvaluationBuilder, FunctionConstructorStrategy } from './CodeEval';
	import Log from './Log.svelte';

	let toolbox = new ToolboxCreator([LoadingDataCategory, DataCleaningCategory, DataTransformationCategory]);

	onMount(() => {
		workspace = Blockly.inject('test', {
			toolbox: addPrebuiltBlocks(toolbox.getCategoryToolboxObject(javascriptGenerator))
		});

		workspace.registerButtonCallback('CREATE_VARIABLE', () =>
			Blockly.Variables.createVariableButtonHandler(workspace)
		);
	});

	async function compileCode() {
		let code = javascriptGenerator.workspaceToCode(workspace);

		let evaluator = new CodeEvaluationBuilder();
		evaluator.withCode(code);
		evaluator.withContext({
			dfd,
			getFileByName,
			appendToLog,
			clearLog
		});
		evaluator.wrapCodeAsync();
		evaluator.withExecStrategy(FunctionConstructorStrategy);

		evaluator.run();

	}

	let getFileByName: (fileName: string) => File | null;
	let appendToLog: (text: string) => void;
	let clearLog: () => void;
</script>

<br />
<button on:click={compileCode}>Run code</button>
<div class="columns">
	<div id="test" style="height: 800px; width: 800px;"></div>
	<div class="is-flex is-flex-direction-column is-justify-content-space-between" id="devToolsContainer">
		<FileSystem bind:getFileByName />
		<Log bind:appendToLog bind:clearLog />
	</div>
</div>

<style>
 #devToolsContainer {
   width: 100%;
 }
</style>
