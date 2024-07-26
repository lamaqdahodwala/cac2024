<script lang="ts">
	import * as Blockly from 'blockly';
	import { javascriptGenerator } from 'blockly/javascript';
	let workspace: Blockly.Workspace | Blockly.WorkspaceSvg | undefined;
	import { onMount } from 'svelte';
	import { ToolboxCreator } from '$lib/abstract/BlocklyInterface';
	import { ExampleCategory } from '$lib/blocks/Example';
	import { LoadingDataCategory } from '$lib/blocks/LoadingData';
	import { DataManipulationCategory } from '$lib/blocks/DataManipulation';
	import { blocks } from 'blockly/blocks';
	import { addPrebuiltBlocks } from '$lib/blocks/PrebuiltBlocks';

	let toolbox = new ToolboxCreator([DataManipulationCategory]);

	onMount(() => {
		workspace = Blockly.inject('test', {
			toolbox: addPrebuiltBlocks(toolbox.getToolboxObject(javascriptGenerator))
		});
	});

	function compileCode() {
		let code = javascriptGenerator.workspaceToCode(workspace);
		eval(code);
	}
</script>

<div id="test" style="height: 800px; width: 800px;"></div>
<button on:click={compileCode}>Run code</button>
