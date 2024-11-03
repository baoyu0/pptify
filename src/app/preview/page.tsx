'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { Slide } from '@/lib/markdown';

// 动态导入 RevealPreview 组件
const RevealPreview = dynamic(
  () => import('@/components/RevealPreview'),
  { ssr: false }
);

// 加载状态组件
function LoadingState() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <p>加载中...</p>
      </div>
    </div>
  );
}

// 错误状态组件
function ErrorState() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center space-y-4">
        <p>没有可预览的内容</p>
        <button
          onClick={() => window.close()}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          返回
        </button>
      </div>
    </div>
  );
}

// 全屏提示组件
function FullscreenPrompt({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center space-y-4">
        <p>点击下方按钮开始全屏预览</p>
        <button
          onClick={onEnter}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          开始全屏预览
        </button>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  const [state, setState] = useState<{
    slides: Slide[];
    status: 'loading' | 'error' | 'fullscreen-prompt' | 'ready';
  }>({
    slides: [],
    status: 'loading'
  });

  useEffect(() => {
    try {
      const storedSlides = localStorage.getItem('slides');
      if (!storedSlides) {
        setState({ slides: [], status: 'error' });
        return;
      }

      const parsedSlides = JSON.parse(storedSlides);
      if (!parsedSlides?.length) {
        setState({ slides: [], status: 'error' });
        return;
      }

      setState({
        slides: parsedSlides,
        status: 'fullscreen-prompt'
      });
    } catch (error) {
      console.error('加载幻灯片数据失败:', error);
      setState({ slides: [], status: 'error' });
    }
  }, []);

  const handleEnterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setState(prev => ({ ...prev, status: 'ready' }));
    } catch (error) {
      console.error('全屏模式失败:', error);
      // 如果全屏失败，也继续显示内容
      setState(prev => ({ ...prev, status: 'ready' }));
    }
  };

  switch (state.status) {
    case 'loading':
      return <LoadingState />;
    case 'error':
      return <ErrorState />;
    case 'fullscreen-prompt':
      return <FullscreenPrompt onEnter={handleEnterFullscreen} />;
    case 'ready':
      return <RevealPreview slides={state.slides} />;
    default:
      return <ErrorState />;
  }
} 