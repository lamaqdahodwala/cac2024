<script lang="ts">
	import { marked } from "marked";

  let rawContent = ""
</script>

<textarea class="textarea" placeholder="Type your lesson here..." bind:value={rawContent}></textarea>

<hr>

<div class="content">
  {@html marked(rawContent)}
</div>
