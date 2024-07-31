<script lang="ts">
	import * as Blockly from 'blockly';
	import { javascriptGenerator } from 'blockly/javascript';
	let workspace: Blockly.Workspace | Blockly.WorkspaceSvg | undefined;
	import { onMount } from 'svelte';
	import { ToolboxCreator } from '$lib/abstract/BlocklyInterface';
	import { ExampleCategory } from '$lib/blocks/Example';
	import { LoadingDataCategory } from '$lib/blocks/LoadingData';
	import { DataCleaningCategory } from '$lib/blocks/DataCleaning';
	import { blocks } from 'blockly/blocks';
	import { addPrebuiltBlocks } from '$lib/blocks/PrebuiltBlocks';
	import FileSystem from './FileSystem.svelte';
	import { CodeEvaluator } from './Evaluator';
	import * as dfd from 'danfojs/dist/danfojs-browser/src';

	let toolbox = new ToolboxCreator([LoadingDataCategory, DataCleaningCategory]);

	onMount(() => {
		workspace = Blockly.inject('test', {
			toolbox: addPrebuiltBlocks(toolbox.getCategoryToolboxObject(javascriptGenerator))
		});

		workspace.registerButtonCallback(
			'CREATE_VARIABLE',
			() => Blockly.Variables.createVariableButtonHandler(workspace)
		);
	});

	async function compileCode() {
		let code = javascriptGenerator.workspaceToCode(workspace);
		let evaluator = new CodeEvaluator();

		evaluator.addExternalAPI((interpreter, globalObject) => {
			let alertWrapper = function alert(text: any) {
				return window.alert(text);
			};

			interpreter.setProperty(
				globalObject,
				'alert',
				interpreter.createNativeFunction(alertWrapper)
			);
		});

		evaluator.addExternalAPI((interpreter, globalObject) => {
			let getFileWrapper = interpreter.createNativeFunction(getFileByName);
			interpreter.setProperty(globalObject, 'getFileByName', getFileWrapper);
		});

		evaluator.addExternalAPI((interpreter, globalObject) => {
			const danfoPackageRetriever = () => dfd;
			interpreter.setProperty(
				globalObject,
				'danfoFunc',
				interpreter.createNativeFunction(danfoPackageRetriever)
			);
		});

		// evaluator.addCode('const dfd = JSON.parse(dfdAsJson); \n')

		evaluator.addCode(code);

		evaluator.run();
	}

	let getFileByName: (fileName: string) => File | null;
</script>

<div id="test" style="height: 800px; width: 800px;"></div>
<button on:click={compileCode}>Run code</button>

<FileSystem bind:getFileByName />
