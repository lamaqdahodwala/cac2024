import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	let courseId = params.courseId;

	let res = await fetch(`/api/getAllLessonsInCourse?courseId=${courseId}`);

	let json = await res.json();

	let res2 = await fetch(`/api/getCourseInfo?courseId=${courseId}`);

	let json2 = await res2.json();

	return { lessons: json, courseInfo: json2.course };
};
