import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	let courseId = params.courseId;

	let res = await fetch(`/api/getAllLessonsInCourse?courseId=${courseId}`);
	let json = await res.json();

	let res2 = await fetch(`/api/getCourseInfo?courseId=${courseId}`);
	let json2 = await res2.json();

  let res3 = await fetch(`/api/getNextLessonInCourse?courseId=${courseId}`)
  let json3 = await res3.json()

  if (!json2.course) throw error(404, "Course not found")

	return { lessons: json, courseInfo: json2.course, nextLesson: json3.lesson };
};
