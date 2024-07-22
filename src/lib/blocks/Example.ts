import { CreateCategory, ToolboxCreator, type BlocklyJson, type CustomBlock } from "$lib/abstract/BlocklyInterface";
import type { Block, CodeGenerator } from "blockly";

class ExampleBlock implements CustomBlock {
  getJSON(): BlocklyJson {
    return {
      type: "example",
      tooltip: "",
      message0: "Hello world",
      colour: 100,
      previousStatement: null, 
      nextStatement: null,
    }
  }

  getCodeForGenerator(block: Block, generator: CodeGenerator) {
      return "console.log('hello world');"
  }
}

export const ExampleCategory = CreateCategory([
  ExampleBlock
])

