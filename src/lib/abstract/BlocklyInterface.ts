import * as Blockly from 'blockly';
import { JavascriptGenerator } from 'blockly/javascript';
import { getCompilationStrategyForBlock } from './BlockCompilationStrategy';

export interface CustomBlock {
	getCodeForGenerator(
		block: Blockly.Block,
		generator: JavascriptGenerator
	): string | BlockReturningValue;
	getJSON(): BlocklyJson;
}

export interface CustomCategory {
	getBlocks(): CustomBlock[];
	compileForToolbox(generator: JavascriptGenerator): { kind: string; type: string }[];
	getDisplayName(): string;
}

export interface Toolbox {
	kind: string;
	contents: {
		kind: string;
		type: string;
	}[];
}

export interface BlocklyJson {
	type: string;
	tooltip?: string;
	helpUrl?: string;
	message0: string;
	args0?: {
		type: string;
		name: string;
		check?: string | string[];
		align?: string;
		text?: string;
		value?: number | string;
		options?: [displayString: string, fieldName: string][];
		variable?: string;
	}[];
	previousStatement?: string | null;
	nextStatement?: string | null;
	output?: string | string[] | null;
	colour: number;
}

export interface Category {
	kind: 'category';
	name: string;
	contents: { kind: string; type: string }[];
}

export interface CategoryToolbox {
	kind: 'categoryToolbox';
	contents: Category[];
}

export function CreateCategory(
	blocks: ((new () => CustomBlock) | CustomBlock)[],
	displayName: string
) {
	class Temp implements CustomCategory {
		constructor(private blocks: CustomBlock[]) {}

		getBlocks(): CustomBlock[] {
			return this.blocks;
		}

		compileForToolbox(generator: JavascriptGenerator) {
			this.blocks.forEach((block) => {
				let strategy = getCompilationStrategyForBlock(block);
				strategy.compile();
			});
			this.addCodeToGenerator(generator);
			return this.blocks.map((value) => ({
				kind: 'block',
				type: value.getJSON().type
			}));
		}

		addCodeToGenerator(generator: JavascriptGenerator) {
			this.blocks.forEach((value) => {
				generator.forBlock[value.getJSON().type] = (block, generator) => {
					let code = value.getCodeForGenerator(block, generator);

					if (typeof code === 'string') {
						code += '\n';
					} else {
						code[0] += '\n';
					}

					return code;
				};
			});
		}

		getDisplayName(): string {
			return displayName;
		}
	}

	return new Temp(
		blocks.map((value) => {
			if (typeof value === 'function') return new value();
			return value;
		})
	);
}

export class ToolboxCreator {
	constructor(private categories: CustomCategory[]) {}

	getToolboxObject(generator: JavascriptGenerator): Toolbox {
		let toolBoxContents: { kind: string; type: string }[] = [];
		this.categories.forEach((value) => {
			let blocks = value.compileForToolbox(generator);
			toolBoxContents = [...toolBoxContents, ...blocks];
		});
		return {
			kind: 'flyoutToolbox',
			contents: toolBoxContents
		};
	}

	getCategoryToolboxObject(generator: JavascriptGenerator): CategoryToolbox {
		let toolbox: CategoryToolbox = { contents: [], kind: 'categoryToolbox' };
		let toolboxContents = toolbox.contents;

		this.categories.forEach((value) => {
			toolboxContents.push({
				kind: 'category',
				name: value.getDisplayName(),
				contents: value.compileForToolbox(generator)
			});
		});

		return toolbox;
	}
}

export function createCustomBlock(
	json: BlocklyJson,
	callback: (block: Blockly.Block, generator: JavascriptGenerator) => string | BlockReturningValue
) {
	class Temp implements CustomBlock {
		getJSON(): BlocklyJson {
			return json;
		}
		getCodeForGenerator(
			block: Blockly.Block,
			generator: JavascriptGenerator
		): string | BlockReturningValue {
			return callback(block, generator);
		}
	}
	return new Temp();
}

export abstract class MutatedBlock {
	abstract getJSON(): MutatedBlocklyJson;
	abstract getCodeForGenerator(
		block: Blockly.Block,
		generator: JavascriptGenerator
	): string | BlockReturningValue;

	getBlockList(): string[] {
		return [];
	}
	helperFunction() {}

	configure() {
		Blockly.Extensions.registerMutator(
			this.getJSON().mutator.type,
			this.getJSON().mutator.methods,
			this.helperFunction,
			this.getBlockList()
		);
	}
}

export interface MutatedBlocklyJson extends BlocklyJson {
	mutator: Mutator;
}

export interface MutatorMethods {
	saveExtraState(): object;
	loadExtraState(state: object): void;
	decompose(workspace: Blockly.Workspace): Blockly.Block;
	compose(block: Blockly.Block): void;
}

export type InputMapType = {
	blockTypeInMutatorUi: string;
	inputName: string;
	config: {
		fields: {
			fieldName: string;
			opts: {
				type: 'number' | 'text' | 'dropdown';
				value?: number | string;
				dropdownOptions?: {
					internalName: string;
					userText: string;
				}[];
			};
			fieldLabel: string;
		}[];
	};
}[];

export interface InputMapMutator {
	saveExtraState(): object;
	loadExtraState(state: object): void;
	inputMap(): InputMapType;
	topBlockInMutatorUI: string;
}

export interface Mutator {
	type: string;
	methods: MutatorMethods;
}

export function useInputMap(value: new () => InputMapMutator): MutatorMethods {
	let instance = new value();
	let inputMap = instance.inputMap();

  let hasSetEventHandler = false

	return {
		loadExtraState(state: object): void {
			return instance.loadExtraState(state);
		},

		saveExtraState(): object {
			return instance.saveExtraState();
		},

		compose(this: Blockly.Block, topBlock: Blockly.Block): void {
			let connection = topBlock.nextConnection!;
			let nextBlock = connection.targetBlock();
			nextBlock = topBlock.getNextBlock();

			console.log(this.inputList);

			function findBlockNameInInputMap(blockName: string) {
				for (let index = 0; index < inputMap.length; index++) {
					const element = inputMap[index];

					if (element.inputName === blockName) {
						return element;
					}
				}
				return null;
			}
			function findBlockTypeInInputMap(blockName: string) {
				for (let index = 0; index < inputMap.length; index++) {
					const element = inputMap[index];

					if (element.blockTypeInMutatorUi === blockName) {
						return element;
					}
				}
				return null;
			}
			this.inputList.forEach((input) => {
        if (findBlockNameInInputMap(input.name)){
          this.removeInput(input.name)
        }
			});

			while (nextBlock) {
				if (nextBlock.isInsertionMarker()) {
					nextBlock = nextBlock.getNextBlock();
					continue;
				}

				let blockName = nextBlock.type;

				let fieldDetails = findBlockTypeInInputMap(blockName);

				if (!fieldDetails) {
					nextBlock = nextBlock.getNextBlock();
					continue;
				}

				let fieldConfig = fieldDetails.config;

				let i = findBlockTypeInInputMap(nextBlock.type);
				let input = this.appendDummyInput(i.inputName);
				fieldConfig.fields.forEach((fieldConf) => {
					input.appendField(fieldConf.fieldLabel);
					let field;
					switch (fieldConf.opts.type) {
						case 'dropdown':
							let menu: Blockly.MenuGenerator = [];
							let dropdownOptions = fieldConf.opts.dropdownOptions!;
							dropdownOptions.forEach((value) => menu.push([value.userText, value.internalName]));
							field = new Blockly.FieldDropdown(menu);
							field.name = fieldConf.fieldName;
						case 'number':
							field = new Blockly.FieldNumber(fieldConf.opts.value);
							field.name = fieldConf.fieldName;
							break;
						case 'text':
							field = new Blockly.FieldTextInput(String(fieldConf.opts.value));
							field.name = fieldConf.fieldName;
					}

					if (nextBlock === null) throw new Error();

					input.appendField(field, fieldConf.fieldName);
				});

				nextBlock = nextBlock.getNextBlock();
			}
		},

		decompose(workspace: Blockly.Workspace): Blockly.Block {
			const topBlock = workspace.newBlock(instance.topBlockInMutatorUI);
			let connection = topBlock.nextConnection!;

			(topBlock as Blockly.BlockSvg).initSvg();
			inputMap.forEach((value) => {
				let subBlockName = value.blockTypeInMutatorUi;
				let subBlock = workspace.newBlock(subBlockName);

				(subBlock as Blockly.BlockSvg).initSvg();

				connection.connect(subBlock.previousConnection!);

				connection = subBlock.nextConnection!;
			});

			return topBlock;
		}
	} satisfies MutatorMethods;
}
export type BlockReturningValue = [code: string, order: number];

export function createMutatedBlock(
	json: MutatedBlocklyJson,
	callback: (block: Blockly.Block, generator: JavascriptGenerator) => string | BlockReturningValue,
	blockList: string[] = [],
	helperFunction?: Function
) {
	class Temp extends MutatedBlock {
		getJSON(): MutatedBlocklyJson {
			return json;
		}
		getCodeForGenerator(
			block: Blockly.Block,
			generator: JavascriptGenerator
		): string | BlockReturningValue {
			return callback(block, generator);
		}

		getBlockList(): string[] {
			return blockList;
		}

		helperFunction(): void {
			helperFunction ? helperFunction() : null;
		}
	}
	return new Temp();
}
