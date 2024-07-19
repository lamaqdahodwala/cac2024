import * as Blockly from 'blockly'


interface Block{
    getCodeForGenerator(block: Blockly.Block, generator: Blockly.Generator): string
    getJSON(): string
}

interface Category {
    getBlocks(): Block[]
}