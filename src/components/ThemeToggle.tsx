'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ThemeToggle() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 获取当前主题图标
  const getCurrentIcon = () => {
    switch (theme) {
      case 'light':
        return <SunIcon className="w-5 h-5 text-yellow-500" />;
      case 'dark':
        return <MoonIcon className="w-5 h-5 text-blue-400" />;
      case 'system':
        return <ComputerDesktopIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  // 如果是预览页，不显示主题切换按钮
  if (pathname === '/preview') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors border border-white/20"
        title="切换主题"
      >
        {getCurrentIcon()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
          <div className="py-1">
            <button
              onClick={() => {
                setTheme('light');
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${
                theme === 'light'
                  ? 'text-yellow-400 bg-white/10'
                  : 'text-gray-200 hover:bg-white/10'
              }`}
            >
              <SunIcon className="w-4 h-4 mr-2" />
              浅色模式
            </button>
            <button
              onClick={() => {
                setTheme('dark');
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${
                theme === 'dark'
                  ? 'text-blue-400 bg-white/10'
                  : 'text-gray-200 hover:bg-white/10'
              }`}
            >
              <MoonIcon className="w-4 h-4 mr-2" />
              深色模式
            </button>
            <button
              onClick={() => {
                setTheme('system');
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${
                theme === 'system'
                  ? 'text-gray-400 bg-white/10'
                  : 'text-gray-200 hover:bg-white/10'
              }`}
            >
              <ComputerDesktopIcon className="w-4 h-4 mr-2" />
              跟随系统
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 