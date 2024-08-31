<script lang="ts">
	import { invalidateAll } from "$app/navigation";
  import type {LayoutData} from "./$types"
	import LessonsSidebar from "./[lessonId]/LessonsSidebar.svelte";

  export let data: LayoutData

</script>

<LessonsSidebar courseId={data.courseId} on:navigate={invalidateAll}/>

<slot/>
