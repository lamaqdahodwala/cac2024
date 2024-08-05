
<script lang="ts">
  let text = ""
  export function appendToLog(text: string){
    text += `${text}\n`
  }

  export function clearLog() {
    text = ""
  }
</script>

<textarea disabled>{text}</textarea>
