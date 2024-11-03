'use client';

import { useState, useEffect } from 'react';
import type { Slide } from '@/lib/markdown';

interface SlidePreviewProps {
  slides: Slide[];
}

export function SlidePreview({ slides }: SlidePreviewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevSlide();
    } else if (e.key === 'ArrowRight') {
      handleNextSlide();
    } else if (e.key === 'Escape') {
      setIsFullscreen(false);
    }
  };

  const handleFullscreen = () => {
    window.open('/preview', '_blank', 'fullscreen=yes');
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!slides.length) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="aspect-[16/9] bg-white rounded-lg shadow-lg p-8 relative">
        <div 
          className="w-full h-full overflow-auto"
          dangerouslySetInnerHTML={{ __html: slides[currentSlide].content }}
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
          <button
            onClick={handlePrevSlide}
            disabled={currentSlide === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            上一页
          </button>
          <span className="text-sm">
            {currentSlide + 1} / {slides.length}
          </span>
          <button
            onClick={handleNextSlide}
            disabled={currentSlide === slides.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            下一页
          </button>
          <button
            onClick={handleFullscreen}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            全屏预览
          </button>
        </div>
      </div>
    </div>
  );
} 