import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async({params, fetch}) => {
	return {
		courseId: params.courseId,
		lessonId: params.lessonId,
	};
};
