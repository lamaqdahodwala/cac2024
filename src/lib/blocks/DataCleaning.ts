import { CreateCategory, type BlocklyJson, type CustomBlock } from '../abstract/BlocklyInterface';
import type { Block } from 'blockly';
import { JavascriptGenerator } from 'blockly/javascript';

class FilterDataByBooleanBlock implements CustomBlock {
	getJSON(): BlocklyJson {
		return {
			type: 'Filter_Data_By_Boolean_Block',
			tooltip: 'Filter data by a boolean condition',
			helpUrl: '',
			message0: 'Filter data by boolean %1 %2',
			args0: [
				{
					type: 'field_input',
					name: 'CONDITION',
					text: 'df["column"] > 0'
				},
				{
					type: 'input_dummy',
					name: ''
				}
			],
			output: 'String',
			colour: 300
		};
	}
	getCodeForGenerator(block: Block, generator: JavascriptGenerator): string {
		const cond = block.getFieldValue('CONDITION');
		return `
            const dfd = require("danfojs-node");
            df.filter(${JSON.stringify(cond)}).then(df => df.toJSON());`;
	}
}

class FilterDataByRowsBlock implements CustomBlock {
	getJSON(): BlocklyJson {
		return {
			type: 'Filter_Data_By_Rows_Block',
			tooltip: 'Filter data by rows',
			helpUrl: '',
			message0: 'Filter data by rows %1 %2',
			args0: [
				{
					type: 'field_input',
					name: 'ROW_INDICES',
					text: '[0, 1, 2]'
				},
				{
					type: 'input_dummy',
					name: ''
				}
			],
			output: 'String',
			colour: 300
		};
	}
	getCodeForGenerator(block: Block, generator: JavascriptGenerator): string {
		const ri = block.getFieldValue('ROW_INDICES');
		return `
            const dfd = require("danfojs-node");
            df.iloc(${JSON.stringify(ri)}).then(df => df.toJSON());`;
	}
}

class FilterDataByColumnsBlock implements CustomBlock {
	getJSON(): BlocklyJson {
		return {
			type: 'Filter_Data_By_Columns_Block',
			tooltip: 'Filter data by columns',
			helpUrl: '',
			message0: 'Filter data by columns %1 %2',
			args0: [
				{
					type: 'field_input',
					name: 'COLUMN_NAMES',
					text: '["column1", "column2"]'
				},
				{
					type: 'input_dummy',
					name: ''
				}
			],
			output: 'String',
			colour: 300
		};
	}
	getCodeForGenerator(block: Block, generator: JavascriptGenerator): string {
		const colNames = block.getFieldValue('COLUMN_NAMES');
		return `
            const dfd = require("danfojs-node");
            df.loc(null, ${JSON.stringify(colNames)}).then(df => df.toJSON());`;
	}
}

class FilterDataByValuesBlock implements CustomBlock {
	getJSON(): BlocklyJson {
		return {
			type: 'Filter_Data_By_Values_Block',
			tooltip: 'Filter data by values',
			helpUrl: '',
			message0: 'Filter data by values %1 %2 %3',
			args0: [
				{
					type: 'field_input',
					name: 'COLUMN',
					text: 'column'
				},
				{
					type: 'field_input',
					name: 'VALUE',
					text: 'value'
				},
				{
					type: 'input_dummy',
					name: ''
				}
			],
			output: 'String',
			colour: 300
		};
	}
	getCodeForGenerator(block: Block, generator: JavascriptGenerator): string {
		const col = block.getFieldValue('COLUMN');
		const val = block.getFieldValue('VALUE');
		return `
            const dfd = require("danfojs-node");
            df.loc(df[${JSON.stringify(col)}].eq(${JSON.stringify(val)})).then(df => df.toJSON());`;
	}
}

class RemoveNullValuesBlock implements CustomBlock {
	getJSON(): BlocklyJson {
		return {
			type: 'Remove_Null_Values_Block',
			tooltip: 'Remove null values from data',
			helpUrl: '',
			message0: 'Remove null values',
			output: 'String',
			colour: 300
		};
	}
	getCodeForGenerator(block: Block, generator: JavascriptGenerator): string {
		return `
            const dfd = require("danfojs-node");
            df.dropNa().then(df => df.toJSON());`;
	}
}

class FillNullValuesBlock implements CustomBlock {
	getJSON(): BlocklyJson {
		return {
			type: 'Fill_Null_Values_Block',
			tooltip: 'Fill null values in data',
			helpUrl: '',
			message0: 'Fill null values with %1 %2',
			args0: [
				{
					type: 'field_input',
					name: 'VALUE',
					text: '0'
				},
				{
					type: 'input_dummy',
					name: ''
				}
			],
			output: 'String',
			colour: 300
		};
	}
	getCodeForGenerator(block: Block, generator: JavascriptGenerator): string {
		const val = block.getFieldValue('VALUE');
		return `
            const dfd = require("danfojs-node");
            df.fillNa(${JSON.stringify(val)}).then(df => df.toJSON());`;
	}
}

class DropDuplicatesBlock implements CustomBlock {
	getJSON(): BlocklyJson {
		return {
			type: 'Drop_Duplicates_Block',
			tooltip: 'Drop duplicate rows in data',
			helpUrl: '',
			message0: 'Drop duplicate rows',
			output: 'String',
			colour: 300
		};
	}
	getCodeForGenerator(block: Block, generator: JavascriptGenerator): string {
		return `
            const dfd = require("danfojs-node");
            df.dropDuplicates().then(df => df.toJSON());`;
	}
}

export const DataCleaningCategory = CreateCategory([FilterDataByBooleanBlock, FilterDataByRowsBlock, FilterDataByColumnsBlock, FilterDataByValuesBlock, RemoveNullValuesBlock,FillNullValuesBlock, DropDuplicatesBlock], "Data Cleaning");
