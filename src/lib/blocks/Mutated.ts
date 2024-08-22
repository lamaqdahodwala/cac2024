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
    isPresent: false
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
        isInputPresent: this.state.isPresent,
        allowMultiple: false,
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
								value: 16
							}
						}
					]
				}
			}
		];
	}

  topBlockInMutatorUI = {
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
	['test_topblock_item']
);

export const MutatedCategory = CreateCategory([mutatedBlock], 'Mutated');
