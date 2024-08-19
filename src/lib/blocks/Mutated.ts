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
        blockTypeInMutatorUi: "controls_if_elseif",
        inputName: "if",
        config: {
          amount: 1, 
          fields: [
            {
              fieldLabel: "Test", 
              fieldName: "testField", 
              opts: {
                type: "number",
                value: this.state.count 
              }
            }
          ]
        }
      }
    ]
  }

  topBlockInMutatorUI = "controls_if_if";
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
	() => "console.log('hello world')", ['controls_if_elseif']
  
);

export const MutatedCategory = CreateCategory([mutatedBlock], "Mutated")
