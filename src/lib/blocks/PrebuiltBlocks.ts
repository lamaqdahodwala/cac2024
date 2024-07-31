import * as Blockly from 'blockly';
import type { Category, CategoryToolbox } from '$lib/abstract/BlocklyInterface';
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

        if (categoryName.toLowerCase() === 'variables') {
            toolboxEntry.contents.unshift(
                {
                    type: 'variables_get',
                    kind: 'block'
                },
                {
                    type: 'variables_set',
                    kind: 'block'
                },
                {
                    type: 'button',
                    kind: 'button',
                    text: 'Create Variable...',
                    callbackKey: 'CREATE_VARIABLE'
                }
            );
        }

        Blockly.registry.register('category', categoryName.toLowerCase(), toolboxEntry);

        newToolbox.contents = [...newToolbox.contents, toolboxEntry];
    }

    Blockly.Extensions.register('create_variable_callback', function(workspace) {
        workspace.registerButtonCallback('CREATE_VARIABLE', function(button) {
            const variableName = prompt('Enter a variable name:');
            if (variableName) {
                Blockly.Variables.createVariable(button.getTargetWorkspace(), null, variableName);
            }
        });
    });

    return {
        kind: "categoryToolbox",
        contents: [
            ...newToolbox.contents,
            {
                kind: "category",
                name: "AI",
                contents: previousContents
            }
        ]
    };
}

Blockly.defineBlocksWithJsonArray([
    {
        "type": "variables_get",
        "message0": "%1",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
            }
        ],
        "output": null,
        "colour": 330,
        "helpUrl": "get var"
    },
    {
        "type": "variables_set",
        "message0": "%{BKY_VARIABLES_SET}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
            },
            {
                "type": "input_value",
                "name": "VALUE"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 330,
        "helpUrl": "set var"
    }
]);