import { createCustomBlock } from '$lib/abstract/BlocklyInterface';
import { Order } from 'blockly/javascript';
import { CreateCategory, type BlocklyJson, type BlockReturningValue, type CustomBlock } from '../abstract/BlocklyInterface';
import type { Block } from 'blockly';
import { JavascriptGenerator } from 'blockly/javascript';

const printBlock = createCustomBlock(
	{
		type: 'print',
		tooltip: 'Print out a value to the log',
		helpUrl: '',
		message0: 'print %1',
		args0: [
			{
				type: 'input_value',
				name: 'toPrint'
			}
		],
    previousStatement: null, 
    nextStatement: null,
		colour: 135
	},
	(block, generator) => {
		const value_toprint = generator.valueToCode(block, 'toPrint', Order.ATOMIC);
		const code = `appendToLog(${value_toprint})`;
		return code;
	}
);

const printFirstRowsBlock = createCustomBlock(
	{
	  type: 'print_first_rows',
	  tooltip: 'Print the first n rows of a dataframe',
	  helpUrl: '',
	  message0: 'In dataframe %1 print the first %2 rows',
	  args0: [
		{
		  type: 'field_input',
		  name: 'dataframe',
		  text: 'df' // Default dataframe name
		},
		{
		  type: 'field_number',
		  name: 'rows',
		  value: 5,
		  min: 1,  
		}
	  ],
	  previousStatement: null,
	  nextStatement: null,
	  colour: 135,
	},
	(block, generator) => {
	  const dataframe = block.getFieldValue('dataframe');
	  const rows = block.getFieldValue('rows');
	  const code = `${dataframe}.head(${rows}).print()`;
	  return code;
	}
  );
  

  const printLastRowsBlock = createCustomBlock(
	{
	  type: 'print_last_rows',
	  tooltip: 'Print the last n rows of a dataframe',
	  helpUrl: '',
	  message0: 'In dataframe %1 print the last %2 rows',
	  args0: [
		{
		  type: 'field_input',
		  name: 'dataframe',
		  text: 'df'
		},
		{
		  type: 'field_number',
		  name: 'rows',
		  value: 5, 
		  min: 1, 
		}
	  ],
	  previousStatement: null,
	  nextStatement: null,
	  colour: 135,
	},
	(block, generator) => {
	  const dataframe = block.getFieldValue('dataframe');
	  const rows = block.getFieldValue('rows');
	  const code = `${dataframe}.tail(${rows}).print()`;
	  return code;
	}
  );

export const OutputCategory = CreateCategory([printBlock, printFirstRowsBlock, printLastRowsBlock], "Output");
