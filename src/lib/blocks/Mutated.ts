import {
	createMutatedBlock,
	MutatedBlock,
	useInputMap,
	type InputMapMutator,
	type InputMapType,
	type MutatedBlocklyJson,
	type Mutator,
	type MutatorMethods
} from '$lib/abstract/BlocklyInterface';
import type { Workspace, Block } from 'blockly';
import { CreateCategory } from '../abstract/BlocklyInterface';

class TestMutation implements InputMapMutator {
	private state = {
		count: 0
	};

	saveExtraState(): object {
		return this.state;
	}

	loadExtraState(state: typeof this.state): void {
		this.state = state;
	}

	inputMap(): InputMapType {
		return [
			{
				blockTypeInMutatorUi: 'test_topblock_item',
				inputName: 'if',
        autoCreate: {
          textToDisplay: "Test field"
        },
				config: {
					fields: [
						{
							fieldLabel: 'Test',
							fieldName: 'testField',
							opts: {
								type: 'number',
								value: this.state.count
							}
						}
					]
				}
			}
		];
	}

  topBlockInMutatorUI: { blockType: string; textToDisplay: string; } = {
    textToDisplay: "Test top block",
    blockType: "test_topblock_container",
  };
}

let mutatedBlock = createMutatedBlock(
	{
		type: 'mutatedBlock',
		tooltip: '',
		helpUrl: '',
		message0: 'Mutate Me',
		colour: 225,
		mutator: {
			type: 'blockMutator',
			methods: useInputMap(TestMutation)
		}
	},
	(block, generator) => {

    let fieldValue = block.getFieldValue("testField")
    console.log(fieldValue)
		return `console.log(${fieldValue})`;
	},
	['controls_if_elseif']
);

export const MutatedCategory = CreateCategory([mutatedBlock], 'Mutated');
