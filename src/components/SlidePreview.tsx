'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Slide } from '@/lib/markdown';

interface SlidePreviewProps {
  slides: Slide[];
}

export function SlidePreview({ slides }: SlidePreviewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, [slides.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevSlide();
    } else if (e.key === 'ArrowRight') {
      handleNextSlide();
    }
  }, [handlePrevSlide, handleNextSlide]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

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
        </div>
      </div>
    </div>
  );
} 