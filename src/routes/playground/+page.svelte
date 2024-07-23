<script lang="ts">
	import * as Blockly from 'blockly';
	import { javascriptGenerator } from 'blockly/javascript';
	let workspace: Blockly.Workspace | Blockly.WorkspaceSvg | undefined;
	import { onMount } from 'svelte';
	import { ToolboxCreator } from '$lib/abstract/BlocklyInterface';
	import { ExampleCategory } from '$lib/blocks/Example';
	import { blocks } from 'blockly/blocks';

	let toolbox = new ToolboxCreator([ExampleCategory]);

	onMount(() => {
		workspace = Blockly.inject('test', {
			toolbox: toolbox.getToolboxObject(javascriptGenerator)
		});
	});

	function compileCode() {
		let code = javascriptGenerator.workspaceToCode(workspace);
		eval(code);
	}
</script>

<div id="test" style="height: 400px; width: 800px;"></div>
<button on:click={compileCode}>Run code</button>
