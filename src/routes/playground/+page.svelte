<script>
	import Playground from './Playground.svelte';
	import { LoadingDataCategory } from '$lib/blocks/LoadingData';
	import { DataTransformationCategory } from '$lib/blocks/DataTransformation';
	import { DataCleaningCategory } from '$lib/blocks/DataCleaning';
	import { ModelTrainingCategory } from '$lib/blocks/ModelTraining';
	import { OptimizerCategory } from '$lib/blocks/Optimizers';
	import { OutputCategory } from '$lib/blocks/Output';
	import { LayersCategory } from '$lib/blocks/Layers';
</script>

<Playground
	categories={[
		LoadingDataCategory,
		DataTransformationCategory,
		DataCleaningCategory,
		ModelTrainingCategory,
		OptimizerCategory,
		OutputCategory,
		LayersCategory
	]}
/>
