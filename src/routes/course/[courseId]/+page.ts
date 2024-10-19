import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	let courseId = params.courseId;

	let allLessons = await fetch(`/api/getAllLessonsInCourse?courseId=${courseId}`);
	let allLessonsJson = await allLessons.json();

	let courseInfo = await fetch(`/api/getCourseInfo?courseId=${courseId}`);
	let courseInfoJson = await courseInfo.json();

	let nextLesson = await fetch(`/api/getNextLessonInCourse?courseId=${courseId}`);
	let nextLessonJson = await nextLesson.json();

	let courseCompletion = await fetch(`/api/getCourseCompletion?courseId=${courseId}`);
	let courseCompletionJson = await courseCompletion.json();

	if (!courseInfoJson.course) throw error(404, 'Course not found');

	return {
		lessons: allLessonsJson.lessons,
		courseInfo: courseInfoJson.course,
		nextLesson: nextLessonJson.lesson,
		percentCompleted: courseCompletionJson.percent
	};
};
