import * as Blockly from 'blockly';

export interface CustomBlock {
	getCodeForGenerator(block: Blockly.Block, generator: Blockly.Generator): string;
	getJSON(): BlocklyJson;
}

export interface CustomCategory {
	getBlocks(): CustomBlock[];
	compileForToolbox(): { kind: string; type: string }[];
}

interface Toolbox {
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
	}[];
	previousStatement?: string | null;
	nextStatement?: string | null;
	colour: number;
}

export function CreateCategory(blocks: (new () => CustomBlock)[]) {
	class Temp implements CustomCategory {
		constructor(private blocks: CustomBlock[]) {}

		getBlocks(): CustomBlock[] {
			return this.blocks;
		}

		compileForToolbox() {
			Blockly.defineBlocksWithJsonArray(this.blocks.map((block) => block.getJSON()));
			return this.blocks.map((value) => ({
				kind: 'block',
				type: value.getJSON().type
			}));
		}
	}

	return new Temp(blocks.map((value) => new value()));
}

export class ToolboxCreator {
	constructor(private categories: CustomCategory[]) {}

	getToolboxObject(): Toolbox {
    let toolBoxContents: {kind: string, type: string}[] = []
    this.categories.forEach((value) => {
      let blocks = value.compileForToolbox()
      toolBoxContents = [...toolBoxContents, ...blocks]
    })
		return {
			kind: 'flyoutToolbox',
			contents: toolBoxContents
		};
	}
}

