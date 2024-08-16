<script lang="ts">
  export function getFiles(){

  }

  let file: File
  let inputFile: HTMLInputElement
  let choseFile: string = "No file chosen";

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
      choseFile = inputFile.files[0].name;
    } else {
      choseFile = "No file chosen";
    }
  }

</script>

<div>
  <label for="fileInput" class="button-style">Choose File</label>
  <span>{choseFile}</span>
</div>
<input id="fileInput" type="file" on:change={showFile} style="display: none;" />

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
