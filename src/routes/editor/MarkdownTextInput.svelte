<script lang="ts">
	import { marked } from "marked";

  let rawContent = ""
</script>

<textarea class="textarea" placeholder="Type your lesson here..." bind:value={rawContent}></textarea>

<hr>
{@html marked(rawContent)}

