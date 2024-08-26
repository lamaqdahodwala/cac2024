import { CreateCategory, type BlocklyJson, type BlockReturningValue, type CustomBlock } from '../abstract/BlocklyInterface';
import type { Block } from 'blockly';
import { Order, type JavascriptGenerator } from 'blockly/javascript';

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
    getCodeForGenerator(block: Block, generator: JavascriptGenerator): BlockReturningValue {
        const csvPath = block.getFieldValue('CSV_PATH');
        return [ `await dfd.readCSV(getFileByName(${JSON.stringify(csvPath)}))`, Order.NONE ];
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
    getCodeForGenerator(block: Block, generator: JavascriptGenerator): BlockReturningValue {
        const excelPath = block.getFieldValue('EXCEL_PATH');
        return [ `dfd.readExcel(getFileByName(${ excelPath })).then(df => df.toJSON())`, Order.NONE];
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
    getCodeForGenerator(block: Block, generator: JavascriptGenerator): BlockReturningValue {
        const jsonPath = block.getFieldValue('JSON_PATH');
        return [ `returnOrThrow(() => dfd.readJSON(getFileByName (${JSON.stringify(jsonPath)}) ).then(df => df.toJSON()), 'File '${jsonPath}' does not exist', getFileByName(${JSON.stringify(jsonPath)}))` , Order.NONE];
    }
}

export const LoadingDataCategory = CreateCategory([LoadCSVBlock, LoadExcelBlock, LoadJSONBlock], "Loading Data");
