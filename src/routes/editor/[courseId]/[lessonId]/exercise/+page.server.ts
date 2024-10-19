import { prisma } from '$lib/db';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions: Actions = {
	default: async (event) => {
		let data = await event.request.formData();

		function convertToTrueOrFalse(formInput: any) {
			if (formInput === null) {
				return false;
			}
			return true;
		}

		let hasPrebuiltModelBlocks = convertToTrueOrFalse(data.get('hasPrebuiltModelBlocks'));
		let hasDataCleaningBlocks = convertToTrueOrFalse(data.get('hasDataCleaningBlocks'));
		let hasCustomModelBlocks = convertToTrueOrFalse( data.get('hasCustomModelBlocks') )
		let hasBasicProgrammingBlocks = convertToTrueOrFalse(data.get('hasBasicProgrammingBlocks'));
		let hasTrainTestSplit = convertToTrueOrFalse(data.get('hasTrainTestSplit'));
		let instructions = data.get('instructions');
		let passRequirement = data.get('passRequirement');
		let testDataset = data.get('testDataset');
		let trainDataset = data.get('trainDataset');
		let id = data.get('id');


		await prisma.courseProblem.update({
		  where: {
		    id: Number( id )
		  },
		  data: {
		    hasPrebuiltModelBlocks,
        hasCustomModelBlocks,
        hasBasicProgrammingBlocks,
        hasDataCleaningBlocks,
        hasTrainTestSplit,

        instructions: instructions ? instructions.valueOf() : "",
        passRequirement: passRequirement ? Number( passRequirement.valueOf() ) : 80

		  }
		})

		console.log(data);
	}
};

export const load: PageServerLoad = async(event) => {
  let res = await event.fetch(`/api/getExerciseParameters?lessonId=${event.params.lessonId}`)

  let json = await res.json()

  if (!res.ok) {
    throw redirect(301, `/editor/${event.params.courseId}/${event.params.lessonId}`)
  }

  return {
    exerciseParams: json.exercise,
  }
}
