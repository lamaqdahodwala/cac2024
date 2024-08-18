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

@useInputMap
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
    ]
  }

  topBlockInMutatorUI = "controls_if_if";
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
      // @ts-ignore
			methods: new TestMutation()
		}
	},
	() => "console.log('hello world')"
);

export const MutatedCategory = CreateCategory([mutatedBlock], "Mutated")
