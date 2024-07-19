import { CreateCategory, ToolboxCreator, type BlocklyJson, type CustomBlock } from "$lib/abstract/BlocklyInterface";
import type { Block, CodeGenerator } from "blockly";

class ExampleBlock implements CustomBlock {
  getJSON(): BlocklyJson {
    return {
      type: "example",
      tooltip: "",
      message0: "Hello world",
      colour: 100
    }
  }

  getCodeForGenerator(block: Block, generator: CodeGenerator) {
      return "console.log('hello world')"
  }
}


const ExampleCategory = CreateCategory([
  ExampleBlock
])

