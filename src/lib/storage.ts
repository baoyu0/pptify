export interface StoredFile {
  id: string;
  name: string;
  content: string;
  createdAt: number;
}

const STORAGE_KEY = 'pptify_files';

export const fileStorage = {
  // 获取所有文件
  getFiles(): StoredFile[] {
    const files = localStorage.getItem(STORAGE_KEY);
    return files ? JSON.parse(files) : [];
  },

  // 添加文件
  addFile(name: string, content: string): StoredFile {
    const files = this.getFiles();
    const newFile: StoredFile = {
      id: Date.now().toString(),
      name,
      content,
      createdAt: Date.now(),
    };
    files.push(newFile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
    return newFile;
  },

  // 删除文件
  deleteFile(id: string): void {
    const files = this.getFiles().filter(file => file.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
  },

  // 获取单个文件
  getFile(id: string): StoredFile | null {
    const files = this.getFiles();
    return files.find(file => file.id === id) || null;
  }
}; 