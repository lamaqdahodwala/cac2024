import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	let params = event.params;
	let res = await event.fetch(`/api/getLessonContent?lessonId=${params.lessonId}`);
	let json = await res.json();
  
  if (!res.ok) {
    throw error(404, "Lesson not Found")
  }

	let hasQuizAlready = await event.fetch(`/api/getQuizQuestions?lessonId=${params.lessonId}`);

  let hasQuizAlreadyJSON = (await hasQuizAlready.json())


	let hasExerciseAlready = await event.fetch(`/api/getExerciseParameters?lessonId=${params.lessonId}`);
  let hasExerciseAlreadyJSON = await hasExerciseAlready.json()



	let return_object = {
		courseId: params.courseId,
		lessonId: params.lessonId,
		textContent: json,
		hasQuizAlready: !!hasQuizAlreadyJSON.quiz,
    hasExerciseAlready: !!hasExerciseAlreadyJSON.exercise
	};

	return return_object;
};
