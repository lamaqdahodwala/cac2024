<script lang="ts">
	import * as Blockly from 'blockly';
	import { javascriptGenerator } from 'blockly/javascript';
  let workspace: Blockly.Workspace | Blockly.WorkspaceSvg | undefined
	import { onMount } from 'svelte';
	onMount(() => {
		const toolbox = {
			// There are two kinds of toolboxes. The simpler one is a flyout toolbox.
			kind: 'flyoutToolbox',
			// The contents is the blocks and other items that exist in your toolbox.
			contents: [
				{
					kind: 'block',
					type: 'controls_if'
				},
				{
					kind: 'block',
					type: 'controls_whileUntil'
				}, {
          kind: "block", 
          type: "controls_for"
        },
        {
          kind: "block",
          type: "logic_boolean"
        }
			]
		};

    Blockly.defineBlocksWithJsonArray([ {
      "message0": "Alert user with message %1",
    } ])

		// The toolbox gets passed to the configuration struct during injection.
		workspace = Blockly.inject('test', { toolbox: toolbox });
	});

  function compileCode(){
    let code = javascriptGenerator.workspaceToCode(workspace)
    eval(code)
  }
</script>

<div id="test" style="height: 400px; width: 800px;"></div>
<button>Run code</button>
