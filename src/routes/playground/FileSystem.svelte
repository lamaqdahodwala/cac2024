<script lang="ts">
  export function getFiles(){
    return inputFile.files ? Array.from(inputFile.files) : [];
  }

  let file: File
  let inputFile: HTMLInputElement
  let choseFiles: string[] = [];

  export function getFileByName(fileName: string){
    let files = inputFile.files

    if (!files) return null

    for (let index = 0; index < files.length; index++) {
      const file = files.item(index);

      if (file?.name === fileName) return file
    }

    return null
  }

  function showFile() {
    if (inputFile.files && inputFile.files.length > 0) {
      choseFiles = Array.from(inputFile.files).map(file => file.name);
    } else {
      choseFiles = ["No file chosen"];
    }
  }

  export async function handleMultipleFiles() {
    const files = getFiles();
    if (files.length === 0) {
      console.error("No files selected.");
      return;
    }
  }

</script>

<div>
  <label for="fileInput" class="button-style">Choose Files</label>
  <span>{choseFiles.join(", ")}</span>
</div>
<input id="fileInput" bind:this={inputFile} type="file" on:change={showFile} multiple style="display: none;" />

<style>
  .button-style {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
    display: inline-block;
    text-align: center;
  }

  .button-style:hover {
    background-color: #0056b3;
  }
</style>
