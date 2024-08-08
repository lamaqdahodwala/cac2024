import * as Blockly from 'blockly';
import type { Category, CategoryToolbox } from '$lib/abstract/BlocklyInterface';
import { toolboxString } from './prebuilt_toolbox';

export function addPrebuiltBlocks(toolbox: CategoryToolbox): CategoryToolbox {
  let previousContents = toolbox.contents;
  let parsedDoc = Blockly.utils.xml.textToDom(toolboxString);
  let categories = parsedDoc.getElementsByTagName('category');
  
  let newToolbox: CategoryToolbox = { kind: 'categoryToolbox', contents: [] };
  
  for (let index = 0; index < categories.length; index++) {
    const element = categories[index];
    let categoryName = element.getAttribute('name');
    
    if (!categoryName) throw new Error('Category name not found');
    
    let toolboxEntry: Category = { 
		kind: 'category', 
		name: categoryName, 
		contents: [] };
    
    if (categoryName.toLowerCase() === 'variables') {
      toolboxEntry.custom = 'VARIABLE';
      delete toolboxEntry.contents;
    } else {
      let children = element.children;
      for (let index = 0; index < children.length; index++) {
        const element = children[index];
        let blockType = element.getAttribute('type');
        if (!blockType) throw new Error('Block type not found');
        
        toolboxEntry.contents.push({ type: blockType, kind: 'block' });
      }
    }
    
    Blockly.registry.register('category', categoryName.toLowerCase(), toolboxEntry);
    newToolbox.contents = [...newToolbox.contents, toolboxEntry];
  }
  
  newToolbox.contents.push({ 
	kind: 'category',
	name: 'Functions',
	custom: 'PROCEDURE' });
  
  Blockly.Extensions.register('create_variable_callback', function (workspace) {
    workspace.registerButtonCallback('CREATE_VARIABLE', function (button) {
      const varName = prompt('Enter a variable name:');
      if (varName) {
        Blockly.common.Variables.createVariable(button.getTargetWorkspace(), null, varName);
      }
    });
  });
  
  return { kind: 'categoryToolbox', contents: [...newToolbox.contents, ...previousContents] };
}