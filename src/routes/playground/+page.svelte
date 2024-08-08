<script lang="ts">
	import * as Blockly from 'blockly';
	import { javascriptGenerator } from 'blockly/javascript';
	let workspace: Blockly.Workspace 
	import { onMount } from 'svelte';
	import { ToolboxCreator } from '$lib/abstract/BlocklyInterface';
	import { LoadingDataCategory } from '$lib/blocks/LoadingData';
	import { DataTransformationCategory } from '$lib/blocks/DataTransformation';
	import { DataCleaningCategory } from '$lib/blocks/DataCleaning';
  import {OutputCategory} from '$lib/blocks/Output'
  import {LayersCategory} from '$lib/blocks/Layers'
	import { addPrebuiltBlocks } from '$lib/blocks/PrebuiltBlocks';
	import FileSystem from './FileSystem.svelte';
	import * as dfd from 'danfojs/dist/danfojs-browser/src';
	import { CodeEvaluationBuilder, FunctionConstructorStrategy } from './CodeEval';
	import Log from './Log.svelte';
  import * as tf from '@tensorflow/tfjs'

	let toolbox = new ToolboxCreator([LoadingDataCategory, DataCleaningCategory, DataTransformationCategory, OutputCategory, LayersCategory]);

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
			clearLog,
      tf
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
	<div class="" id="devToolsContainer">
		<FileSystem bind:getFileByName />
		<Log bind:appendToLog bind:clearLog />
	</div>
</div>

<style>
  #devToolsContainer {
  }
</style>
