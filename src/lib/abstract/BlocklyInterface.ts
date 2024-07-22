import * as Blockly from 'blockly';

export interface CustomBlock {
	getCodeForGenerator(block: Blockly.Block, generator: Blockly.Generator): string;
	getJSON(): BlocklyJson;
}

export interface CustomCategory {
	getBlocks(): CustomBlock[];
	compileForToolbox(generator: Blockly.Generator): { kind: string; type: string }[];
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

		compileForToolbox(generator: Blockly.Generator) {
			Blockly.defineBlocksWithJsonArray(this.blocks.map((block) => block.getJSON()));
      this.addCodeToGenerator(generator)
			return this.blocks.map((value) => ({
				kind: 'block',
				type: value.getJSON().type
			}));
		}

    addCodeToGenerator(generator: Blockly.Generator){
      this.blocks.forEach((value) => {
        generator.forBlock[value.getJSON().type] = value.getCodeForGenerator
      })
    }
	}

	return new Temp(blocks.map((value) => new value()));
}

export class ToolboxCreator {
	constructor(private categories: CustomCategory[], private generator: Blockly.Generator) {}

	getToolboxObject(generator: Blockly.Generator): Toolbox {
    let toolBoxContents: {kind: string, type: string}[] = []
    this.categories.forEach((value) => {
      let blocks = value.compileForToolbox(generator)
      toolBoxContents = [...toolBoxContents, ...blocks]
    })
		return {
			kind: 'flyoutToolbox',
			contents: toolBoxContents
		};
	}
}


export function createCustomBlock(json: BlocklyJson, callback: (block: Blockly.Block, generator: Blockly.Generator) => string){
  class Temp implements CustomBlock {
    getJSON(): BlocklyJson {
        return json
    }
    getCodeForGenerator(block: Blockly.Block, generator: Blockly.Generator): string {
        return callback(block, generator)
    }
  }
  return new Temp()
}
