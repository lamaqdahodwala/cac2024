<script lang="ts">
  type FolderEntry = {name: string; isFolder: boolean;files: File[];isOpen: boolean;};

  let choseFiles: FolderEntry[] = [];
  let showFileSystem = false;

  export function getFiles(): File[] {
    return choseFiles.flatMap((entry) => entry.files);
  }

  export function getFileByName(fileName: string): File | null {
    for (let entry of choseFiles) {
      const foundFile = entry.files.find((file) => file.name === fileName);
      if (foundFile) return foundFile;
    }
    return null;
  }
</script>