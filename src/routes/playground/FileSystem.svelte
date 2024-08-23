<script lang="ts">
  import { onMount } from 'svelte';

  type FileEntry = {
    name: string;
    isFolder: boolean;
    children: FileEntry[];
    isOpen: boolean;
    file?: File;
    parent?: FileEntry;
  };

  let rootEntry: FileEntry = { name: 'root', isFolder: true, children: [], isOpen: true };
  let showFileSystem = true;

  function getFiles(entry: FileEntry = rootEntry): File[] {
    if (!entry.isFolder) {
      return entry.file ? [entry.file] : [];
    }
    return entry.children.flatMap(getFiles);
  }

  export function getAllFiles(): File[] {
    return getFiles();
  }

  export function getFileByName(fileName: string, entry: FileEntry = rootEntry): File | null {
    if (!entry.isFolder && entry.file && entry.file.name === fileName) {
      return entry.file;
    }
    if (entry.isFolder) {
      for (let child of entry.children) {
        const foundFile = getFileByName(fileName, child);
        if (foundFile) return foundFile;
      }
    }
    return null;
  }

  function addFileEntry(file: File, path: string[], currentEntry: FileEntry = rootEntry) {
    if (path.length === 0) {
      currentEntry.children.push({ name: file.name, isFolder: false, children: [], isOpen: false, file, parent: currentEntry });
    } else {
      const folderName = path[0];
      let folder = currentEntry.children.find(child => child.isFolder && child.name === folderName);
      if (!folder) {
        folder = { name: folderName, isFolder: true, children: [], isOpen: false, parent: currentEntry };
        currentEntry.children.push(folder);
      }
      addFileEntry(file, path.slice(1), folder);
    }
  }

  function handleFileSelect(files: FileList) {
    Array.from(files).forEach((file) => {
      const path = file.webkitRelativePath ? file.webkitRelativePath.split('/') : [file.name];
      addFileEntry(file, path.slice(0, -1));
    });
    rootEntry = { ...rootEntry };
  }
</script>