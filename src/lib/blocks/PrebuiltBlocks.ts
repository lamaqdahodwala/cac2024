import * as Blockly from 'blockly';
import type { Category, CategoryToolbox, Toolbox } from '$lib/abstract/BlocklyInterface';
import { toolboxString } from './prebuilt_toolbox';

export function addPrebuiltBlocks(toolbox: CategoryToolbox): CategoryToolbox {
	let previousContents = toolbox.contents;

	let parser = new DOMParser();
	let parsedDoc = parser.parseFromString(toolboxString, 'text/xml');

	let categories = parsedDoc.getElementsByTagName('category');

	let newToolbox: CategoryToolbox = {
		kind: 'categoryToolbox',
		contents: []
	};

	for (let index = 0; index < categories.length; index++) {
		const element = categories[index];
		let categoryName = element.getAttribute('name');

		if (!categoryName) throw new Error();

		let toolboxEntry: Category = {
			kind: 'category',
			name: categoryName,
			contents: []
		};

		let children = element.children;

		for (let index = 0; index < children.length; index++) {
			const element = children[index];
			let blockType = element.getAttribute('type');
			if (!blockType) throw new Error();

			toolboxEntry.contents.push({
				type: blockType,
				kind: 'block'
			});
		}
		newToolbox.contents = [...newToolbox.contents, toolboxEntry];
	}


	return {
		kind: 'categoryToolbox',
		contents: [...newToolbox.contents, ...previousContents]
	};
}
