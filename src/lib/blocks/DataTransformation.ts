import { CreateCategory, type BlocklyJson, type BlockReturningValue, type CustomBlock } from '../abstract/BlocklyInterface';
import type { Block } from 'blockly';
import { Order, type JavascriptGenerator } from 'blockly/javascript';

class RenameColumnBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Rename_Column_Block',
            tooltip: 'Renames a column in the dataframe',
            helpUrl: '',
            message0: 'In dataframe %1 rename column %2 to %3',
            args0: [
                {
                    type: 'field_input',
                    name: 'DATAFRAME',
                    text: 'df'
                },
                {
                    type: 'field_input',
                    name: 'OLD_NAME',
                    text: 'old_column'
                },
                {
                    type: 'field_input',
                    name: 'NEW_NAME',
                    text: 'new_column'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 165,
        };
    }
    getCodeForGenerator(block: Block, generator: JavascriptGenerator): BlockReturningValue {
        const dataframe = block.getFieldValue('DATAFRAME');
        const oldName = block.getFieldValue('OLD_NAME');
        const newName = block.getFieldValue('NEW_NAME');
        return [`${dataframe}.rename({ "${oldName}": "${newName}" }, { inplace: true })`, Order.AWAIT];
    }
}

class ChangeDataTypeBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Change_Data_Type_Block',
            tooltip: 'Changes the data type of a column in the dataframe',
            helpUrl: '',
            message0: 'In dataframe %1 change data type of column %2 to %3',
            args0: [
                {
                    type: 'field_input',
                    name: 'DATAFRAME',
                    text: 'df'
                },
                {
                    type: 'field_input',
                    name: 'COLUMN_NAME',
                    text: 'column_name'
                },
                {
                    type: 'field_input',
                    name: 'DATA_TYPE',
                    text: 'int32'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 165,
        };
    }
    getCodeForGenerator(block: Block, generator: JavascriptGenerator): BlockReturningValue {
        const dataframe = block.getFieldValue('DATAFRAME');
        const columnName = block.getFieldValue('COLUMN_NAME');
        const dataType = block.getFieldValue('DATA_TYPE');
        return [`${dataframe}["${columnName}"] = ${dataframe}["${columnName}"].astype("${dataType}")`, Order.AWAIT];
    }
}

class CreateNewColumnBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Create_New_Column_Block',
            tooltip: 'Creates a new column in the dataframe',
            helpUrl: '',
            message0: 'In dataframe %1 create new column %2 with value %3',
            args0: [
                {
                    type: 'field_input',
                    name: 'DATAFRAME',
                    text: 'df'
                },
                {
                    type: 'field_input',
                    name: 'COLUMN_NAME',
                    text: 'new_column'
                },
                {
                    type: 'field_input',
                    name: 'VALUE',
                    text: '0'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 165,
        };
    }
    getCodeForGenerator(block: Block, generator: JavascriptGenerator): BlockReturningValue {
        const dataframe = block.getFieldValue('DATAFRAME');
        const columnName = block.getFieldValue('COLUMN_NAME');
        const value = block.getFieldValue('VALUE');
        return [`${dataframe}["${columnName}"] = ${value}`, Order.AWAIT];
    }
}

class DropColumnBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Drop_Column_Block',
            tooltip: 'Drops a column from the dataframe',
            helpUrl: '',
            message0: 'In dataframe %1 drop column %2',
            args0: [
                {
                    type: 'field_input',
                    name: 'DATAFRAME',
                    text: 'df'
                },
                {
                    type: 'field_input',
                    name: 'COLUMN_NAME',
                    text: 'column_name'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 165,
        };
    }
    getCodeForGenerator(block: Block, generator: JavascriptGenerator): BlockReturningValue {
        const dataframe = block.getFieldValue('DATAFRAME');
        const columnName = block.getFieldValue('COLUMN_NAME');
        return [`${dataframe}.drop(["${columnName}"], { axis: 1, inplace: true })`, Order.AWAIT];
    }
}

class MergeDataframesBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Merge_Dataframes_Block',
            tooltip: 'Merges two dataframes',
            helpUrl: '',
            message0: 'Combine dataframe %1 with %2 on column %3',
            args0: [
                {
                    type: 'field_input',
                    name: 'DATAFRAME1',
                    text: 'df1'
                },
                {
                    type: 'field_input',
                    name: 'DATAFRAME2',
                    text: 'df2'
                },
                {
                    type: 'field_input',
                    name: 'COLUMN_NAME',
                    text: 'column_name'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 165,
        };
    }
    getCodeForGenerator(block: Block, generator: JavascriptGenerator): BlockReturningValue {
        const dataframe1 = block.getFieldValue('DATAFRAME1');
        const dataframe2 = block.getFieldValue('DATAFRAME2');
        const columnName = block.getFieldValue('COLUMN_NAME');
        return [`${dataframe1}.merge(${dataframe2}, { on: "${columnName}" })`, Order.AWAIT];
    }
}

class GroupByBlock implements CustomBlock {
    getJSON(): BlocklyJson {
        return {
            type: 'Group_By_Block',
            tooltip: 'Groups the dataframe by a specified column',
            helpUrl: '',
            message0: 'In dataframe %1 group by column %2',
            args0: [
                {
                    type: 'field_input',
                    name: 'DATAFRAME',
                    text: 'df'
                },
                {
                    type: 'field_input',
                    name: 'COLUMN_NAME',
                    text: 'column_name'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 165,
        };
    }
    getCodeForGenerator(block: Block, generator: JavascriptGenerator): BlockReturningValue {
        const dataframe = block.getFieldValue('DATAFRAME');
        const columnName = block.getFieldValue('COLUMN_NAME');
        return [`${dataframe}.groupby(["${columnName}"])`, Order.AWAIT];
    }
}

export const DataTransformationCategory = CreateCategory([RenameColumnBlock, ChangeDataTypeBlock, CreateNewColumnBlock, DropColumnBlock, MergeDataframesBlock, GroupByBlock], "Data Transformation");
