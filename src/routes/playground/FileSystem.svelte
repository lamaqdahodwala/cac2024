<script lang="ts">
  export function getFiles(){
    return choseFiles;
  }

  let file: File
  let inputFile: HTMLInputElement
  let choseFiles: File[] = [];

  export function getFileByName(fileName: string): File | null {
    for (let file of choseFiles) {
      if (file.name === fileName) return file;
    }
    return null;
  }

  function showFile() {
    if (inputFile.files && inputFile.files.length > 0) {
      const newFiles = Array.from(inputFile.files);
      choseFiles = [...choseFiles, ...newFiles];
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
  <span>{choseFiles.map(file => file.name).join(", ")}</span>
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