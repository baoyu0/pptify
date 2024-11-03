'use client';

import { useState, useEffect } from 'react';
import { fileStorage, type StoredFile } from '@/lib/storage';

interface FileListProps {
  onSelect: (file: StoredFile) => void;
}

export function FileList({ onSelect }: FileListProps) {
  const [files, setFiles] = useState<StoredFile[]>([]);

  useEffect(() => {
    setFiles(fileStorage.getFiles());
  }, []);

  const handleDelete = (id: string) => {
    fileStorage.deleteFile(id);
    setFiles(fileStorage.getFiles());
  };

  if (files.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-4">
        暂无文件
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {files.map(file => (
        <div
          key={file.id}
          className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        >
          <span className="flex-1 truncate dark:text-gray-200">{file.name}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onSelect(file)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              预览
            </button>
            <button
              onClick={() => handleDelete(file.id)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              删除
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 