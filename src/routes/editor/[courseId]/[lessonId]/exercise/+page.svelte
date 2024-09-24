<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let {
		hasPrebuiltModelBlocks,
		hasDataCleaningBlocks,
		hasCustomModelBlocks,
		hasBasicProgrammingBlocks,
    hasTrainTestSplit, 
    instructions, 
    passRequirement,
    testDataset, 
    trainDataset
	} = data.exerciseParams;
</script>

<h1 class="title">Edit exercise</h1>


