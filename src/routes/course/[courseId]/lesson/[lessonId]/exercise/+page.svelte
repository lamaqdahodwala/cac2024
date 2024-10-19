<script lang="ts">
	import { ToolboxCreator } from '$lib/abstract/BlocklyInterface';
	import { DataCleaningCategory } from '$lib/blocks/DataCleaning';
	import { DataTransformationCategory } from '$lib/blocks/DataTransformation';
	import { LayersCategory } from '$lib/blocks/Layers';
	import { LoadingDataCategory } from '$lib/blocks/LoadingData';
	import { ModelTrainingCategory } from '$lib/blocks/ModelTraining';
	import { OptimizerCategory } from '$lib/blocks/Optimizers';
	import { OutputCategory } from '$lib/blocks/Output';
	import { addPrebuiltBlocks } from '$lib/blocks/PrebuiltBlocks';
	import Playground from '../../../../../playground/Playground.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	function getCategories(exerciseParams) {
		let categories = [
			OutputCategory,
		];

    if (exerciseParams.hasDataCleaningBlocks) {
      categories.push(DataCleaningCategory, DataTransformationCategory, LoadingDataCategory)
    }

    if (exerciseParams.hasCustomModelBlocks) {
      categories.push(ModelTrainingCategory, LayersCategory, OptimizerCategory)
    }

    return categories
	}

</script>


<Playground categories={getCategories(data.exerciseParams)} instructions={data.exerciseParams.instructions} passRequirement={data.exerciseParams.passRequirement}/>
