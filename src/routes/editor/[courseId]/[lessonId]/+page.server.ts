import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	let res = await fetch(`/api/getLessonContent?lessonId=${params.lessonId}`);
	let json = await res.json();

	return {
		courseId: params.courseId,
		lessonId: params.lessonId,
    textContent: json
	};
};
