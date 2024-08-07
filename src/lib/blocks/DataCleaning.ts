import { CreateCategory, type BlocklyJson, type BlockReturningValue, type CustomBlock } from '../abstract/BlocklyInterface';
import type { Block } from 'blockly';
import { JavascriptGenerator, Order } from 'blockly/javascript';

class FilterDataByBooleanBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Filter_Data_By_Boolean_Block',
            tooltip: 'Filter data by a boolean condition',
            helpUrl: '',
            message0: 'In dataframe %1 filter by column %2 where value is %3 than %4',
            args0: [
                {
                    type: 'field_input',
                    name: 'DATAFRAME',
                    text: 'df'
                },
                {
                    type: 'field_input',
                    name: 'COLUMN',
                    text: 'column'
                },
                {
                    type: 'field_dropdown',
                    name: 'CONDITION',
                    "options": [
                        ['greater', 'gt'],
                        ['less', 'lt'],
                        ['equal', 'eq']
                    ]
                },
                {
                    type: 'field_input',
                    name: 'VALUE',
                    text: '0'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 300,
        };
    }
    getCodeForGenerator(block: Block, generator: JavascriptGenerator): BlockReturningValue {
        const dataframe = block.getFieldValue('DATAFRAME');
        const column = block.getFieldValue('COLUMN');
        const condition = block.getFieldValue('CONDITION');
        const value = block.getFieldValue('VALUE');
        const operators: { [key: string]: string } = { gt: '>', lt: '<', eq: '==' };
        return [`${dataframe}.filter(${dataframe}["${column}"] ${operators[condition]} ${value})`, Order.AWAIT];
    }
}

class FilterDataByRowsBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Filter_Data_By_Rows_Block',
            tooltip: 'Filter data by rows',
            helpUrl: '',
            message0: 'In dataframe %1 filter rows from %2 to %3',
            args0: [
                {
                    type: 'field_input',
                    name: 'DATAFRAME',
                    text: 'df'
                },
                {
                    type: 'field_input',
                    name: 'START_ROW',
                    text: '0'
                },
                {
                    type: 'field_input',
                    name: 'END_ROW',
                    text: '10'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 300,
        };
    }
    getCodeForGenerator(block: Block, generator: JavascriptGenerator): BlockReturningValue {
        const dataframe = block.getFieldValue('DATAFRAME');
        const startRow = block.getFieldValue('START_ROW');
        const endRow = block.getFieldValue('END_ROW');
        return [`${dataframe}.iloc(${startRow}:${endRow})`, Order.AWAIT];
    }
}

class FilterDataByColumnsBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Filter_Data_By_Columns_Block',
            tooltip: 'Filter data by columns',
            helpUrl: '',
            message0: 'In dataframe %1 filter by columns %2',
            args0: [
                {
                    type: 'field_input',
                    name: 'DATAFRAME',
                    text: 'df'
                },
                {
                    type: 'field_input',
                    name: 'COLUMN_NAMES',
                    text: 'column1, column2'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 300,
        };
    }
    getCodeForGenerator(block: Block, generator: JavascriptGenerator): BlockReturningValue {
        const dataframe = block.getFieldValue('DATAFRAME');
        const columnNames = block.getFieldValue('COLUMN_NAMES').split(',').map((col: string) => col.trim());
        return [`${dataframe}.loc(null, [${columnNames.map((col: string) => `"${col}"`).join(', ')}])`, Order.AWAIT];
    }
}

class FilterDataByValuesBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Filter_Data_By_Values_Block',
            tooltip: 'Filter data by values',
            helpUrl: '',
            message0: 'In dataframe %1 filter by values in column %2 with value %3',
            args0: [
                {
                    type: 'field_input',
                    name: 'DATAFRAME',
                    text: 'df'
                },
                {
                    type: 'field_input',
                    name: 'COLUMN',
                    text: 'column'
                },
                {
                    type: 'field_input',
                    name: 'VALUE',
                    text: 'value'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 300,
        };
    }
    getCodeForGenerator(block: Block, generator: JavascriptGenerator): BlockReturningValue {
        const dataframe = block.getFieldValue('DATAFRAME');
        const column = block.getFieldValue('COLUMN');
        const value = block.getFieldValue('VALUE');
        return [`${dataframe}.loc(${dataframe}[${JSON.stringify(column)}].eq(${JSON.stringify(value)})).then(df => df.toJSON())`, Order.AWAIT];
    }
}

class RemoveNullValuesBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Remove_Null_Values_Block',
            tooltip: 'Remove null values from data',
            helpUrl: '',
            message0: 'In dataframe %1 remove null values',
            args0: [
                {
                    type: 'field_input',
                    name: 'DATAFRAME',
                    text: 'df'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 300,
        };
    }
    getCodeForGenerator(block: Block, generator: JavascriptGenerator): BlockReturningValue {
        const dataframe = block.getFieldValue('DATAFRAME');
        return [`${dataframe}.dropNa().then(df => df.toJSON())`, Order.AWAIT];
    }
}

class FillNullValuesBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Fill_Null_Values_Block',
            tooltip: 'Fill null values in data',
            helpUrl: '',
            message0: 'In dataframe %1 fill null values with %2',
            args0: [
                {
                    type: 'field_input',
                    name: 'DATAFRAME',
                    text: 'df'
                },
                {
                    type: 'field_input',
                    name: 'VALUE',
                    text: '0'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 300,
        };
    }
    getCodeForGenerator(block: Block, generator: JavascriptGenerator): BlockReturningValue {
        const dataframe = block.getFieldValue('DATAFRAME');
        const value = block.getFieldValue('VALUE');
        return [`${dataframe}.fillNa(${JSON.stringify(value)}).then(df => df.toJSON())`, Order.AWAIT];
    }
}

class DropDuplicatesBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Drop_Duplicates_Block',
            tooltip: 'Drop duplicate rows in data',
            helpUrl: '',
            message0: 'In dataframe %1 drop duplicate rows',
            args0: [
                {
                    type: 'field_input',
                    name: 'DATAFRAME',
                    text: 'df'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 300,
        };
    }
    getCodeForGenerator(block: Block, generator: JavascriptGenerator): BlockReturningValue {
        const dataframe = block.getFieldValue('DATAFRAME');
        return [`${dataframe}.dropDuplicates().then(df => df.toJSON())`, Order.AWAIT];
    }
}

export const DataCleaningCategory = CreateCategory([FilterDataByBooleanBlock, FilterDataByRowsBlock, FilterDataByColumnsBlock, FilterDataByValuesBlock, RemoveNullValuesBlock, FillNullValuesBlock, DropDuplicatesBlock ], 'Data Cleaning');