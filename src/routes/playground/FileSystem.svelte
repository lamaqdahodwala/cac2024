
<script lang="ts">
  export function getFiles(){

  }

  let file: File
  let inputFile: HTMLInputElement


  export function getFileByName(fileName: string){
    let files = inputFile.files

    if (!files) return null

    for (let index = 0; index < files.length; index++) {
      const file = files.item(index);

      if (file?.name === fileName) return file
    }

    return null
  }
</script>

<input type="file" multiple bind:this={inputFile}>

