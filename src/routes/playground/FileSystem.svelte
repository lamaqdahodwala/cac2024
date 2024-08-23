<script lang="ts">
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

  function deleteFile(entry: FileEntry) {
    if (entry.parent) {
      entry.parent.children = entry.parent.children.filter(child => child !== entry);
      rootEntry = { ...rootEntry };
    }
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    const items = event.dataTransfer?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i].webkitGetAsEntry();
        if (item) {
          handleEntry(item);
        }
      }
    }
  }

  function handleEntry(entry: any, path: string[] = []) {
    if (entry.isFile) {
      entry.file((file: File) => {
        addFileEntry(file, path);
        rootEntry = { ...rootEntry };
      });
    } else if (entry.isDirectory) {
      const reader = entry.createReader();
      reader.readEntries((entries: any[]) => {
        entries.forEach((subEntry) => {
          handleEntry(subEntry, [...path, entry.name]);
        });
      });
    }
  }

  function allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  function openFileSelector() {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        handleFileSelect(target.files);
      }
    };
    input.click();
  }

  function toggleFolder(entry: FileEntry) {
    entry.isOpen = !entry.isOpen;
    rootEntry = { ...rootEntry };
  }

  function toggleFileSystem() {
    showFileSystem = !showFileSystem;
  }
</script>