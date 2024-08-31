import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch, parent }) => {
  await parent()

	let lessonId = params.lessonId;

	let res = await fetch(`/api/getQuizQuestions?lessonId=${lessonId}`);

	let json = await res.json();

	if (json.quiz === null) {
		throw redirect(302, `/editor/${params.courseId}/${params.lessonId}`);
	}

	return {
		quiz: json.quiz
	};
};
