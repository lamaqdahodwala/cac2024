import * as Blockly from 'blockly';
import type { Toolbox } from '$lib/abstract/BlocklyInterface';
import { toolboxString } from './prebuilt_toolbox';

export function addPrebuiltBlocks(toolbox: Toolbox): Toolbox {
	let previousContents = toolbox.contents;

	let parser = new DOMParser();
	let parsedDoc = parser.parseFromString(toolboxString, 'text/xml');

	let categories = parsedDoc.getElementsByTagName('category');
	console.log(categories);

	let newToolbox: Toolbox = {
		kind: 'categoryToolbox',
		contents: []
	};

	for (let index = 0; index < categories.length; index++) {
		const element = categories[index];
		let categoryName = element.getAttribute('name');

		if (!categoryName) throw new Error();

		let toolboxEntry: { kind: string; type: string; contents: any[] } = {
			kind: 'category',
      name: categoryName,
			contents: []
		};

		let children = element.children;
		console.log(children);

		for (let index = 0; index < children.length; index++) {
			const element = children[index];
			let blockType = element.getAttribute('type');
			if (!blockType) throw new Error();

			toolboxEntry.contents.push({
				type: blockType,
				kind: 'block'
			});

		}

    Blockly.registry.register("category", categoryName.toLowerCase(), toolboxEntry)

    newToolbox.contents.push(toolboxEntry)
	}

  console.log(toolbox)

	return {
    kind: "categoryToolbox", 
    contents: [
      ...newToolbox.contents, 
      {
        kind: "category", 
        name: "AI",
        contents: toolbox.contents
      }
    ]
  };
}
