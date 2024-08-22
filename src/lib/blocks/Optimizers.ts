import {
	createMutatedBlock,MutatedBlock,useInputMap,type InputMapMutator,type InputMapType,type MutatedBlocklyJson,type Mutator,type MutatorMethods} from '$lib/abstract/BlocklyInterface';
import type { Workspace, Block } from 'blockly';
import { CreateCategory } from '../abstract/BlocklyInterface';

class BaseOptimizerMutation implements InputMapMutator {
	protected state = {};
	saveExtraState(): object {
		return this.state;
	}
	loadExtraState(state: typeof this.state): void {
		this.state = state;
	}
	inputMap(): InputMapType {
		return [];
	}
  topBlockInMutatorUI = {
    textToDisplay: "Optimizer Config",
    blockType: "optimizer_container",
  };
}

class SGDMomentumMutation extends BaseOptimizerMutation {
	inputMap(): InputMapType {
		return [
			{
				blockTypeInMutatorUi: 'sgd_momentum_item',
				inputName: 'momentum',
				isInputPresent: this.state['momentum'],
				allowMultiple: false,
				autoCreate: {
					textToDisplay: "Momentum"
				},
				config: {
					fields: [
						{
							fieldLabel: 'Momentum',
							fieldName: 'momentum',
							opts: {
								type: 'number',
								value: 0.0
							}
						}
					]
				}
			},
			{
				blockTypeInMutatorUi: 'sgd_nesterov_item',
				inputName: 'nesterov',
				isInputPresent: this.state['nesterov'],
				allowMultiple: false,
				autoCreate: {
					textToDisplay: "Nesterov"
				},
				config: {
					fields: [
						{
							fieldLabel: 'Nesterov',
							fieldName: 'nesterov',
							opts: {
								type: 'boolean',
								value: false
							}
						}
					]
				}
			}
		];
	}
}
class AdamMutation extends BaseOptimizerMutation {
	inputMap(): InputMapType {
		return [
			{
				blockTypeInMutatorUi: 'adam_beta1_item',
				inputName: 'beta1',
				isInputPresent: this.state['beta1'],
				allowMultiple: false,
				autoCreate: {
					textToDisplay: "Beta1"
				},
				config: {
					fields: [
						{
							fieldLabel: 'Beta1',
							fieldName: 'beta1',
							opts: {
								type: 'number',
								value: 0.9
							}
						}
					]
				}
			},
			{
				blockTypeInMutatorUi: 'adam_beta2_item',
				inputName: 'beta2',
				isInputPresent: this.state['beta2'],
				allowMultiple: false,
				autoCreate: {
					textToDisplay: "Beta2"
				},
				config: {
					fields: [
						{
							fieldLabel: 'Beta2',
							fieldName: 'beta2',
							opts: {
								type: 'number',
								value: 0.999
							}
						}
					]
				}
			},
			{
				blockTypeInMutatorUi: 'adam_epsilon_item',
				inputName: 'epsilon',
				isInputPresent: this.state['epsilon'],
				allowMultiple: false,
				autoCreate: {
					textToDisplay: "Epsilon"
				},
				config: {
					fields: [
						{
							fieldLabel: 'Epsilon',
							fieldName: 'epsilon',
							opts: {
								type: 'number',
								value: 1e-8
							}
						}
					]
				}
			},
			{
				blockTypeInMutatorUi: 'adam_amsgrad_item',
				inputName: 'amsgrad',
				isInputPresent: this.state['amsgrad'],
				allowMultiple: false,
				autoCreate: {
					textToDisplay: "AMSGrad"
				},
				config: {
					fields: [
						{
							fieldLabel: 'AMSGrad',
							fieldName: 'amsgrad',
							opts: {
								type: 'boolean',
								value: false
							}
						}
					]
				}
			}
		];
	}
}
class RMSpropMutation extends BaseOptimizerMutation {
	inputMap(): InputMapType {
		return [
			{
				blockTypeInMutatorUi: 'rmsprop_rho_item',
				inputName: 'rho',
				isInputPresent: this.state['rho'],
				allowMultiple: false,
				autoCreate: {
					textToDisplay: "Rho"
				},
				config: {
					fields: [
						{
							fieldLabel: 'Rho',
							fieldName: 'rho',
							opts: {
								type: 'number',
								value: 0.9
							}
						}
					]
				}
			},
			{
				blockTypeInMutatorUi: 'rmsprop_epsilon_item',
				inputName: 'epsilon',
				isInputPresent: this.state['epsilon'],
				allowMultiple: false,
				autoCreate: {
					textToDisplay: "Epsilon"
				},
				config: {
					fields: [
						{
							fieldLabel: 'Epsilon',
							fieldName: 'epsilon',
							opts: {
								type: 'number',
								value: 1e-8
							}
						}
					]
				}
			},
			{
				blockTypeInMutatorUi: 'rmsprop_momentum_item',
				inputName: 'momentum',
				isInputPresent: this.state['momentum'],
				allowMultiple: false,
				autoCreate: {
					textToDisplay: "Momentum"
				},
				config: {
					fields: [
						{
							fieldLabel: 'Momentum',
							fieldName: 'momentum',
							opts: {
								type: 'number',
								value: 0.0
							}
						}
					]
				}
			},
			{
				blockTypeInMutatorUi: 'rmsprop_centered_item',
				inputName: 'centered',
				isInputPresent: this.state['centered'],
				allowMultiple: false,
				autoCreate: {
					textToDisplay: "Centered"
				},
				config: {
					fields: [
						{
							fieldLabel: 'Centered',
							fieldName: 'centered',
							opts: {
								type: 'boolean',
								value: false
							}
						}
					]
				}
			}
		];
	}
}
let sgdBlock = createMutatedBlock(
	{
		type: 'sgd_optimizer',
		tooltip: 'SGD Optimizer',
		helpUrl: '',
		message0: 'SGD Optimizer (Learning Rate: %1)',
		args0: [
			{
				type: 'field_number',
				name: 'learningRate',
				value: 0.01,
				min: 0,  
                max: 1
			}
		],
		colour: 225,
		mutator: {
			type: 'sgd_mutator',
			methods: useInputMap(SGDMomentumMutation)
		}
	},
	(block, generator) => {
		let learningRate = block.getFieldValue("learningRate");
		let momentum = block.getFieldValue("momentum") || 0.0;
		let nesterov = block.getFieldValue("nesterov") || false;
		return ``;
	},
	['sgd_momentum_item', 'sgd_nesterov_item']
);

let adamBlock = createMutatedBlock(
	{
		type: 'adam_optimizer',
		tooltip: 'Adam Optimizer',
		helpUrl: '',
		message0: 'Adam Optimizer (Learning Rate: %1)',
		args0: [
			{
				type: 'field_number',
				name: 'learningRate',
				value: 0.001, 
				min: 0, 
				max: 1
			}
		],
		colour: 225,
		mutator: {
			type: 'adam_mutator',
			methods: useInputMap(AdamMutation)
		}
	},
	(block, generator) => {
		let learningRate = block.getFieldValue("learningRate");
		let beta1 = block.getFieldValue("beta1") || 0.9;
		let beta2 = block.getFieldValue("beta2") || 0.999;
		let epsilon = block.getFieldValue("epsilon") || 1e-8;
		let amsgrad = block.getFieldValue("amsgrad") || false;
		return ``;
	},
	['adam_beta1_item', 'adam_beta2_item', 'adam_epsilon_item', 'adam_amsgrad_item']
);


let rmspropBlock = createMutatedBlock(
	{
		type: 'rmsprop_optimizer',
		tooltip: 'RMSprop Optimizer',
		helpUrl: '',
		message0: 'RMSprop Optimizer (Learning Rate: %1)',
		args0: [
			{
				type: 'field_number',
				name: 'learningRate',
				value: 0.001, 
				min: 0,
                max: 1
			}
		],
		colour: 225,
		mutator: {
			type: 'rmsprop_mutator',
			methods: useInputMap(RMSpropMutation)
		}
	},
	(block, generator) => {
		let learningRate = block.getFieldValue("learningRate");
		let rho = block.getFieldValue("rho") || 0.9;
		let epsilon = block.getFieldValue("epsilon") || 1e-8;
		let momentum = block.getFieldValue("momentum") || 0.0;
		let centered = block.getFieldValue("centered") || false;
		return ``;
	},
	['rmsprop_rho_item', 'rmsprop_epsilon_item', 'rmsprop_momentum_item', 'rmsprop_centered_item']
);


export const OptimizerCategory = CreateCategory([sgdBlock,adamBlock,rmspropBlock],'Optimizers');
