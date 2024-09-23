import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	let params = event.params;
	let res = await event.fetch(`/api/getLessonContent?lessonId=${params.lessonId}`);
	let json = await res.json();

	let hasQuizAlready = await event.fetch(`/api/getQuizQuestions?lessonId=${params.lessonId}`);

  let hasQuizAlreadyJSON = (await hasQuizAlready.json())

	let return_object = {
		courseId: params.courseId,
		lessonId: params.lessonId,
		textContent: json,
		hasQuizAlready: !!hasQuizAlreadyJSON.quiz
	};

	return return_object;
};
