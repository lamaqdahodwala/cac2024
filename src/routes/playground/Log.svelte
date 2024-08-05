
<script lang="ts">
  let text = ""
  export function appendToLog(text: string){
    text += `${addLog}\n`
  }

  export function clearLog() {
    text = ""
  }
</script>

<textarea disabled>{text}</textarea>
