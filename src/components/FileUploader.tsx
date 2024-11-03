'use client';

import { useState } from 'react';
import { fileStorage, type StoredFile } from '@/lib/storage';
import { FileList } from './FileList';
import { parseMarkdown } from '@/lib/markdown';

export function FileUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = async (name: string, content: string) => {
    try {
      setError(null);
      // 只保存文件，不自动预览
      fileStorage.addFile(name, content);
    } catch (error) {
      console.error('Error processing file:', error);
      setError(error instanceof Error ? error.message : '处理文件时出错');
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const files = Array.from(e.dataTransfer.files);
    const file = files[0];

    if (!file) {
      setError('请选择文件');
      return;
    }

    if (!file.name.endsWith('.md')) {
      setError('只支持 Markdown (.md) 文件');
      return;
    }

    try {
      const content = await file.text();
      await processFile(file.name, content);
    } catch (error) {
      console.error('Error reading file:', error);
      setError('读取文件失败');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) {
      setError('请选择文件');
      return;
    }

    if (!file.name.endsWith('.md')) {
      setError('只支持 Markdown (.md) 文件');
      return;
    }

    try {
      const content = await file.text();
      await processFile(file.name, content);
    } catch (error) {
      console.error('Error reading file:', error);
      setError('读取文件失败');
    }
  };

  const handleLoadDemo = async () => {
    try {
      setError(null);
      const response = await fetch('/api/demo');
      if (!response.ok) {
        throw new Error('加载示例文件失败');
      }
      const content = await response.text();
      await processFile('demo.md', content);
    } catch (error) {
      console.error('Error loading demo:', error);
      setError('加载示例文件失败');
    }
  };

  const handleSelectFile = async (file: StoredFile) => {
    try {
      console.log('开始处理文件预览:', file.name);
      const parsedSlides = await parseMarkdown(file.content);
      console.log('解析后的幻灯片数据:', parsedSlides);
      
      if (!parsedSlides || parsedSlides.length === 0) {
        throw new Error('无法解析文件内容');
      }
      
      // 确保数据正确存储到 localStorage
      localStorage.setItem('slides', JSON.stringify(parsedSlides));
      console.log('幻灯片数据已存储到 localStorage');
      
      // 打开预览窗口
      const previewWindow = window.open('/preview', '_blank');
      if (previewWindow) {
        console.log('预览窗口已打开');
        previewWindow.addEventListener('load', () => {
          console.log('预览窗口加载完成');
        });
      } else {
        console.error('无法打开预览窗口');
      }
    } catch (error) {
      console.error('预览文件失败:', error);
      setError('预览文件失败');
    }
  };

  return (
    <div className="w-full space-y-8">
      <div
        className={`w-full h-[200px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 transition-colors ${
          isDragging 
            ? 'border-blue-500 bg-blue-50/5' 
            : 'border-white/10 hover:border-white/20'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-lg mb-2 text-gray-300">拖拽 Markdown 文件到此处</p>
        <p className="text-sm text-gray-500">或</p>
        <label className="mt-2 cursor-pointer">
          <input
            type="file"
            accept=".md,.markdown"
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            选择文件
          </span>
        </label>
        {error && (
          <p className="mt-2 text-red-500 text-sm">{error}</p>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleLoadDemo}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded border border-white/10 hover:border-white/20 transition-colors"
        >
          加载示例文件
        </button>
      </div>

      <div className="w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-300">文件列表</h2>
        <FileList onSelect={handleSelectFile} />
      </div>
    </div>
  );
} 