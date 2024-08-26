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
  let showFileSystem = false;

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

<div class="file-system-container">
  <button class="toggle-button" on:click={toggleFileSystem}>
    {showFileSystem ? 'Hide File System' : 'Show File System'}
  </button>
  
  {#if showFileSystem}
    <div class="file-system">
      <div class="drop-zone" on:drop={handleDrop} on:dragover={allowDrop}>
        <label class="button-style" on:click={openFileSelector}>Upload Files</label>
        <div class="file-tree">
          {#if rootEntry.children.length === 0}
            <div class="empty-message">Drop files or folders here to upload</div>
          {:else}
            {#each rootEntry.children as childEntry (childEntry.name)}
              <div class="entry" class:folder={childEntry.isFolder}>
                <div class="entry-header" on:click={() => childEntry.isFolder && toggleFolder(childEntry)}>
                  {#if childEntry.isFolder}
                    <span class="folder-icon">{childEntry.isOpen ? '📂' : '📁'}</span>
                  {:else}
                    <span class="file-icon">📄</span>
                  {/if}
                  <span class="entry-name">{childEntry.name}</span>
                  {#if !childEntry.isFolder}
                    <button class="delete-button" on:click|stopPropagation={() => deleteFile(childEntry)}>✖</button>
                  {/if}
                </div>
                {#if childEntry.isFolder && childEntry.isOpen}
                  <div class="folder-contents">
                    {#each childEntry.children as grandChildEntry (grandChildEntry.name)}
                      <div class="entry" class:folder={grandChildEntry.isFolder}>
                        <div class="entry-header" on:click={() => grandChildEntry.isFolder && toggleFolder(grandChildEntry)}>
                          {#if grandChildEntry.isFolder}
                            <span class="folder-icon">{grandChildEntry.isOpen ? '📂' : '📁'}</span>
                          {:else}
                            <span class="file-icon">📄</span>
                          {/if}
                          <span class="entry-name">{grandChildEntry.name}</span>
                          {#if !grandChildEntry.isFolder}
                            <button class="delete-button" on:click|stopPropagation={() => deleteFile(grandChildEntry)}>✖</button>
                          {/if}
                        </div>
                        {#if grandChildEntry.isFolder && grandChildEntry.isOpen}
                          <div class="folder-contents">
                            {#each grandChildEntry.children as greatGrandChildEntry (greatGrandChildEntry.name)}
                              <div class="entry" class:folder={greatGrandChildEntry.isFolder}>
                                <div class="entry-header" on:click={() => greatGrandChildEntry.isFolder && toggleFolder(greatGrandChildEntry)}>
                                  {#if greatGrandChildEntry.isFolder}
                                    <span class="folder-icon">{greatGrandChildEntry.isOpen ? '📂' : '📁'}</span>
                                  {:else}
                                    <span class="file-icon">📄</span>
                                  {/if}
                                  <span class="entry-name">{greatGrandChildEntry.name}</span>
                                  {#if !greatGrandChildEntry.isFolder}
                                    <button class="delete-button" on:click|stopPropagation={() => deleteFile(greatGrandChildEntry)}>✖</button>
                                  {/if}
                                </div>
                              </div>
                            {/each}
                          </div>
                        {/if}
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .file-system-container {
    position: relative;
    margin: 10px 0;
    width: 100%;
  }
  .toggle-button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
    margin-bottom: 10px;
  }
  .file-system {
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 15px;
    border: 1px solid #ced4da;
    max-width: 100%;
    margin: 0 auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  .drop-zone {
    border: 2px dashed #007bff;
    padding: 20px;
    border-radius: 15px;
    text-align: center;
    cursor: pointer;
    background-color: #ffffff;
    margin-bottom: 20px;
    transition: background-color 0.3s;
  }
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
    margin-right: 10px;
  }
  .file-tree {
    margin-top: 10px;
    max-height: 400px;
    overflow-y: auto;
  }
  .entry {
    margin: 5px 0;
    padding: 5px;
    background-color: #f0f0f0;
    border-radius: 5px;
  }
  .folder {
    background-color: #e9ecef;
  }
  .entry-header {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .folder-icon, .file-icon {
    margin-right: 5px;
  }
  .entry-name {
    flex-grow: 1;
  }
  .folder-contents {
    margin-left: 20px;
  }
  .delete-button {
    background: none;
    border: none;
    color: red;
    font-size: 16px;
    cursor: pointer;
  }
  .empty-message {
    font-style: italic;
    color: #6c757d;
  }
</style>
