import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	let lessonId = event.params.lessonId;
	let courseId = event.params.courseId;

	await event.fetch('/api/addActiveCourse', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			courseId: courseId
		})
	});

	let res = await event.fetch(`/api/getLessonContent?lessonId=${lessonId}&renderHTML=true`);

	let json = await res.json();

	let res2 = await event.fetch(`/api/getSubsequentLesson?lessonId=${lessonId}`);

	let json2 = await res2.json();

  let hasExercise = await event.fetch(`/api/getExerciseParameters?lessonId=${lessonId}`)

  let hasExerciseJSON = await hasExercise.json()

	return {
		lesson: { ...json, id: lessonId, next: json2, hasExercise: !!hasExerciseJSON.exercise }
	};
};
