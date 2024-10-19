<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

  let savingText = ""
	let {
		hasPrebuiltModelBlocks,
		hasDataCleaningBlocks,
		hasCustomModelBlocks,
		hasBasicProgrammingBlocks,
		hasTrainTestSplit,
		instructions,
		passRequirement,
		testDataset,
		trainDataset,
		id
	} = data.exerciseParams;
</script>

<h1 class="title">Edit exercise</h1>
<form
	method="post"
	use:enhance={() => {
    savingText = "Saving..."
    return async({ submit }) => {
      savingText = "Saved!"
      setTimeout(() => {
        savingText = ""
      }, 1000);
    }
	}}
	on:submit|preventDefault
>
	<input type="text" hidden value={id} name="id" />
	<p>
		Instructions: <input type="text" bind:value={instructions} name="instructions" class="input" />
	</p>
	<br />
	<p>
		Pass Requirement: <input
			type="number"
			class="input"
			min="0"
			max="100"
			bind:value={passRequirement}
			name="passRequirement"
		/>
	</p>
	<br />
	<p>
		Has Prebuilt Model Blocks? - <input
			type="checkbox"
			bind:checked={hasPrebuiltModelBlocks}
			name="hasPrebuiltModelBlocks"
		/>
	</p>
	<p>
		Has Custom Model Blocks? - <input
			type="checkbox"
			bind:checked={hasCustomModelBlocks}
			name="hasCustomModelBlocks"
		/>
	</p>
	<p>
		Has Basic Programming Blocks? - <input
			type="checkbox"
			name="hasBasicProgrammingBlocks"
			bind:checked={hasBasicProgrammingBlocks}
		/>
	</p>
	<p>
		Has Train Test Split? - <input
			type="checkbox"
			bind:checked={hasTrainTestSplit}
			name="hasTrainTestSplit"
		/>
	</p>
	<p>
		Has Data Cleaning Blocks? - <input
			type="checkbox"
			bind:checked={hasDataCleaningBlocks}
			name="hasDataCleaningBlocks"
		/>
	</p>
	<hr />
	<button type="submit" class="button is-success">Save</button>
</form>

<p>{savingText}</p>
