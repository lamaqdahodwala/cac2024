<script lang="ts">
  let inputFile: HTMLInputElement;
  let choseFiles: File[] = [];

  export function getFiles() {
    return choseFiles;
  }

  export function getFileByName(fileName: string): File | null {
    return choseFiles.find((file) => file.name === fileName) || null;
  }

  function showFile() {
    if (inputFile.files && inputFile.files.length > 0) {
      const newFiles = Array.from(inputFile.files);
      newFiles.forEach((newFile) => {
        if (!choseFiles.some((existingFile) => existingFile.name === newFile.name)) {
          choseFiles = [...choseFiles, newFile];
        }
      });
    }
    inputFile.value = ''; 
  }

  function deleteFile(fileToDelete: File) {
    choseFiles = choseFiles.filter((file) => file !== fileToDelete);
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
  <div class="file-list">
    {#each choseFiles as file (file.name)}
      <div class="file-item">
        <span>{file.name}</span>
        <button class="delete-button" on:click={() => deleteFile(file)}>✖</button>
      </div>
    {/each}
  </div>
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

  .file-list {
    margin-top: 10px;
  }

  .file-item {
    display: inline-block;
    padding: 5px 10px;
    margin: 5px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 10px;
    position: relative;
  }

  .delete-button {
    background: none;
    border: none;
    color: red;
    font-size: 14px;
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 5px;
    display: none;
  }

  .file-item:hover .delete-button {
    display: block;
  }
</style>