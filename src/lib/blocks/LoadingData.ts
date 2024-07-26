import { CreateCategory, type BlocklyJson, type CustomBlock } from '../abstract/BlocklyInterface';
import type { Block, CodeGenerator } from 'blockly';

class LoadCSVBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Load_CSV_Block',
            tooltip: 'Loads a CSV file from the specified path',
            helpUrl: '',
            message0: 'Load CSV from %1 %2',
            args0: [
                {
                    type: 'field_input',
                    name: 'CSV_PATH',
                    text: 'file.csv'
                },
                {
                    type: 'input_dummy',
                    name: ''
                }
            ],
            output: 'String',
            colour: 225
        };
    }
    getCodeForGenerator(block: Block, generator: CodeGenerator): string {
        const csvPath = block.getFieldValue('CSV_PATH');
        return `
            const dfd = require("danfojs-node");
            dfd.readCSV(${JSON.stringify(csvPath)}).then(df => df.toJSON());`;
    }
}

class LoadExcelBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Load_Excel_Block',
            tooltip: 'Loads an Excel file from the specified path',
            helpUrl: '',
            message0: 'Load Excel from %1 %2',
            args0: [
                {
                    type: 'field_input',
                    name: 'EXCEL_PATH',
                    text: 'file.xlsx'
                },
                {
                    type: 'input_dummy',
                    name: ''
                }
            ],
            output: 'String',
            colour: 225
        };
    }
    getCodeForGenerator(block: Block, generator: CodeGenerator): string {
        const excelPath = block.getFieldValue('EXCEL_PATH');
        return `
            const dfd = require("danfojs-node");
            const path = require("path");
            let localExcelPath = path.join(process.cwd(), ${JSON.stringify(excelPath)});
            dfd.readExcel(localExcelPath).then(df => df.toJSON());`;
            
    }
}

class LoadJSONBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Load_JSON_Block',
            tooltip: 'Loads a JSON file from the specified path',
            helpUrl: '',
            message0: 'Load JSON from %1 %2',
            args0: [
                {
                    type: 'field_input',
                    name: 'JSON_PATH',
                    text: 'file.json'
                },
                {
                    type: 'input_dummy',
                    name: ''
                }
            ],
            output: 'String',
            colour: 225
        };
    }
    getCodeForGenerator(block: Block, generator: CodeGenerator): string {
        const jsonPath = block.getFieldValue('JSON_PATH');
        return `
            const dfd = require("danfojs-node");
            dfd.readJSON(${JSON.stringify(jsonPath)}).then(df => df.toJSON());`;
    }
}

export const LoadingDataCategory = CreateCategory([LoadCSVBlock, LoadExcelBlock, LoadJSONBlock]);
