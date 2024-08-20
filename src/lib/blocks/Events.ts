import { CreateCategory, createCustomBlock } from '$lib/abstract/BlocklyInterface';

let onRunBlock = createCustomBlock({
	type: 'on_run',
	tooltip: '',
	helpUrl: '',
	message0: 'On run: %1 %2',
	args0: [
		{
			type: 'input_dummy',
			name: 'NAME'
		},
		{
			type: 'input_statement',
			name: 'code'
		}
	],
	colour: 75
}, 
  (block, generator) => {
      const statement_code = generator.statementToCode(block, 'code');

    return `async function executeCode(){\n ${statement_code} \n} \n executeCodeFunc = executeCode \n`
  }
);


export let EventsCategory = CreateCategory([onRunBlock], 'Events')
