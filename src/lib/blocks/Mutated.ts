import {
	createMutatedBlock,
	MutatedBlock,
	type MutatedBlocklyJson,
	type Mutator,
	type MutatorMethods
} from '$lib/abstract/BlocklyInterface';
import type { Workspace, Block } from 'blockly';
import { CreateCategory } from '../abstract/BlocklyInterface';

export class TestMutation implements MutatorMethods {
	private state = {
		count: 0
	};
	saveExtraState(): object {
		return this.state;
	}
	loadExtraState(state: typeof this.state): void {
		this.state = state;
	}

	// These are the decompose and compose functions for the lists_create_with block.
	decompose(workspace) {
		// This is a special sub-block that only gets created in the mutator UI.
		// It acts as our "top block"
		var topBlock = workspace.newBlock('lists_create_with_container');
		topBlock.initSvg();

		// Then we add one sub-block for each item in the list.
		var connection = topBlock.getInput('STACK').connection;
		for (var i = 0; i < this.state.count; i++) {
			var itemBlock = workspace.newBlock('lists_create_with_item');
			itemBlock.initSvg();
			connection.connect(itemBlock.previousConnection);
			connection = itemBlock.nextConnection;
		}

		// And finally we have to return the top-block.
		return topBlock;
	}

	compose(topBlock) {
		// First we get the first sub-block (which represents an input on our main block).
		var itemBlock = topBlock.getInputTargetBlock('STACK');

		// Then we collect up all of the connections of on our main block that are
		// referenced by our sub-blocks.
		// This relates to the saveConnections hook (explained below).
		var connections = [];
		while (itemBlock && !itemBlock.isInsertionMarker()) {
			// Ignore insertion markers!
			connections.push(itemBlock.valueConnection_);
			itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
		}

		// Then we disconnect any children where the sub-block associated with that
		// child has been deleted/removed from the stack.
		for (var i = 0; i < this.state.count; i++) {
			var connection = this.getInput('ADD' + i).connection.targetConnection;
			if (connection && connections.indexOf(connection) == -1) {
				connection.disconnect();
			}
		}

		// Then we update the shape of our block (removing or adding iputs as necessary).
		// `this` refers to the main block.
		this.state.count = connections.length;
		this.updateShape_();

		// And finally we reconnect any child blocks.
		for (var i = 0; i < this.state.count; i++) {
			connections[i].reconnect(this, 'ADD' + i);
		}
	}

	updateShape_() {
		this.appendInput();
	}
}

let mutatedBlock = createMutatedBlock(
	{
		type: 'mutatedBlock',
		tooltip: '',
		helpUrl: '',
		message0: 'Mutate Me %1',
		args0: [
			{
				type: 'input_value',
				name: 'NAME'
			}
		],
		colour: 225,
		mutator: {
			type: 'blockMutator',
			methods: new TestMutation()
		}
	},
	() => "console.log('hello world')"
);

export const MutatedCategory = CreateCategory([mutatedBlock], "Mutated")
