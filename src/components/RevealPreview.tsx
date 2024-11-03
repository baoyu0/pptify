'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Reveal from 'reveal.js';
import type { Slide } from '@/lib/markdown';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

// 导入 Reveal.js 的基础样式
import 'reveal.js/dist/reveal.css';

// 导入代码高亮
import 'reveal.js/plugin/highlight/monokai.css';

// 导入插件
import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
import RevealNotes from 'reveal.js/plugin/notes/notes';
import RevealZoom from 'reveal.js/plugin/zoom/zoom';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';

// 导入所有主题
import 'reveal.js/dist/theme/black.css';
import 'reveal.js/dist/theme/white.css';
import 'reveal.js/dist/theme/league.css';
import 'reveal.js/dist/theme/beige.css';
import 'reveal.js/dist/theme/sky.css';
import 'reveal.js/dist/theme/night.css';
import 'reveal.js/dist/theme/serif.css';
import 'reveal.js/dist/theme/simple.css';
import 'reveal.js/dist/theme/solarized.css';
import 'reveal.js/dist/theme/blood.css';
import 'reveal.js/dist/theme/moon.css';

// 修改主题选项
const THEMES = [
  { id: 'white', name: '简约白', path: 'white', background: 'bg-white' },
  { id: 'black', name: '深邃黑', path: 'black', background: 'bg-black' },
  { id: 'league', name: '联盟', path: 'league', background: 'bg-gray-900' },
  { id: 'beige', name: '米色', path: 'beige', background: 'bg-amber-50' },
  { id: 'sky', name: '天空', path: 'sky', background: 'bg-sky-100' },
  { id: 'night', name: '夜晚', path: 'night', background: 'bg-slate-900' },
  { id: 'serif', name: '衬线', path: 'serif', background: 'bg-gray-50' },
  { id: 'simple', name: '简单', path: 'simple', background: 'bg-white' },
  { id: 'solarized', name: '日光', path: 'solarized', background: 'bg-amber-100' },
  { id: 'blood', name: '血色', path: 'blood', background: 'bg-red-900' },
  { id: 'moon', name: '月光', path: 'moon', background: 'bg-gray-800' }
];

// 定义过渡效果选项
const TRANSITIONS = [
  { id: 'none', name: '无' },
  { id: 'fade', name: '淡入淡出' },
  { id: 'slide', name: '滑动' },
  { id: 'convex', name: '凸出' },
  { id: 'concave', name: '凹入' },
  { id: 'zoom', name: '缩放' }
];

interface RevealPreviewProps {
  slides: Slide[];
}

// 自定义样式配置
const CUSTOM_STYLES = `
  .reveal {
    font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
  }

  .reveal .slides {
    text-align: left;
  }

  .reveal .slides section {
    padding: 40px;
  }

  .reveal h1 {
    font-size: 2em;
    font-weight: 600;
    margin-bottom: 0.5em;
    color: #2563eb;
  }

  .reveal h2 {
    font-size: 1.5em;
    font-weight: 600;
    margin-bottom: 0.5em;
    color: #3b82f6;
  }

  .reveal h3 {
    font-size: 1.2em;
    font-weight: 600;
    margin-bottom: 0.5em;
    color: #60a5fa;
  }

  .reveal p {
    font-size: 1em;
    line-height: 1.6;
    margin-bottom: 0.8em;
  }

  .reveal ul, .reveal ol {
    display: block;
    margin-left: 1.5em;
    margin-bottom: 0.8em;
  }

  .reveal li {
    font-size: 1em;
    line-height: 1.6;
    margin-bottom: 0.3em;
  }

  .reveal blockquote {
    font-size: 0.95em;
    font-style: italic;
    border-left: 4px solid #3b82f6;
    margin: 1em 0;
    padding: 0.5em 1em;
    background: rgba(59, 130, 246, 0.1);
  }

  .reveal pre {
    font-size: 0.9em;
    line-height: 1.4;
    margin: 1em 0;
    padding: 1em;
    border-radius: 0.5em;
    background: #1e293b;
  }

  .reveal code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.9em;
    padding: 0.2em 0.4em;
    border-radius: 0.3em;
    background: rgba(30, 41, 59, 0.8);
  }

  .reveal a {
    color: #3b82f6;
    text-decoration: none;
    transition: color 0.2s;
  }

  .reveal a:hover {
    color: #60a5fa;
    text-decoration: underline;
  }

  .reveal img {
    max-height: 400px;
    margin: 1em auto;
    border-radius: 0.5em;
  }

  .reveal table {
    margin: 1em 0;
    font-size: 0.9em;
  }

  .reveal th, .reveal td {
    padding: 0.5em 1em;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }

  .reveal th {
    background: rgba(59, 130, 246, 0.1);
    font-weight: 600;
  }

  .reveal .controls {
    color: #3b82f6;
  }

  .reveal .progress {
    color: #3b82f6;
    height: 4px;
  }

  .reveal .slide-number {
    font-size: 0.8em;
    background: rgba(0, 0, 0, 0.4);
    padding: 2px 8px;
    border-radius: 12px;
  }
`;

export default function RevealPreview({ slides }: RevealPreviewProps) {
  const deckRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<Reveal | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [currentTheme, setCurrentTheme] = useState('white');
  const [transition, setTransition] = useState('slide');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 点击外部关闭菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 主题切换处理
  const handleThemeChange = useCallback(async (themeId: string) => {
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) return;

    try {
      console.log('切换主题:', theme.name);
      setCurrentTheme(themeId);
      
      if (revealRef.current) {
        // 更新 Reveal.js 的主题
        document.documentElement.dataset.theme = theme.path;
        revealRef.current.configure({ theme: theme.path });
        
        // 更新背景颜色
        const deck = document.querySelector('.reveal') as HTMLElement;
        if (deck) {
          deck.className = `reveal h-full transition-colors duration-300 ${theme.background}`;
        }
        
        console.log('主题切换成功');
      }
    } catch (error) {
      console.error('主题切换失败:', error);
    }
  }, []);

  // 初始化 Reveal.js
  useEffect(() => {
    if (!deckRef.current) return;

    const initReveal = async () => {
      try {
        console.log('初始化 Reveal.js...');
        
        // 添加自定义样式
        const style = document.createElement('style');
        style.textContent = CUSTOM_STYLES;
        document.head.appendChild(style);
        
        // 创建自定义触摸事件处理器
        const touchHandler = {
          isEnabled: true,
          startX: 0,
          startY: 0,
          threshold: 40,
          onTouchStart: function(e: TouchEvent) {
            if (e.touches.length === 1) {
              this.startX = e.touches[0].clientX;
              this.startY = e.touches[0].clientY;
            }
          },
          onTouchMove: function(e: TouchEvent) {
            if (!this.isEnabled || e.touches.length !== 1) return;
            const deltaX = e.touches[0].clientX - this.startX;
            if (Math.abs(deltaX) > this.threshold) {
              if (deltaX > 0) {
                revealRef.current?.prev();
              } else {
                revealRef.current?.next();
              }
              this.isEnabled = false;
              setTimeout(() => { this.isEnabled = true; }, 500);
            }
          }
        };

        // 初始化 Reveal
        const deck = new Reveal(deckRef.current, {
          hash: false,
          history: false,
          controls: true,
          progress: true,
          center: false,
          width: 1280,
          height: 720,
          margin: 0.04,
          minScale: 0.2,
          maxScale: 2.0,
          transition,
          theme: currentTheme,
          touch: false,
          gestures: false,
          slideNumber: 'c/t',
          controlsTutorial: false,
          controlsLayout: 'edges',
          controlsBackArrows: 'visible',
          progress: true,
          // 更好的内容布局
          disableLayout: false,
          // 更好的打印支持
          pdfMaxPagesPerSlide: 1,
          pdfSeparateFragments: false,
          // 插件配置
          plugins: [RevealHighlight, RevealNotes, RevealZoom, RevealMarkdown],
        });

        // 添加触摸事件监听器
        const touchStart = touchHandler.onTouchStart.bind(touchHandler);
        const touchMove = touchHandler.onTouchMove.bind(touchHandler);
        deckRef.current.addEventListener('touchstart', touchStart, { passive: true });
        deckRef.current.addEventListener('touchmove', touchMove, { passive: true });

        await deck.initialize();
        revealRef.current = deck;
        console.log('Reveal.js 初始化完成');

        return () => {
          deckRef.current?.removeEventListener('touchstart', touchStart);
          deckRef.current?.removeEventListener('touchmove', touchMove);
        };
      } catch (error) {
        console.error('Reveal.js 初始化失败:', error);
      }
    };

    initReveal();
  }, [transition]); // 只依赖 transition

  return (
    <div className={`fixed inset-0 overflow-hidden ${THEMES.find(t => t.id === currentTheme)?.background || 'bg-black'}`}>
      <div className="reveal h-full transition-colors duration-300" ref={deckRef}>
        <div className="slides h-full">
          {slides.map((slide, index) => (
            <section
              key={index}
              data-auto-animate
              className="text-left"
              dangerouslySetInnerHTML={{ __html: slide.content }}
            />
          ))}
        </div>
      </div>

      {/* 设置按钮和下拉菜单 */}
      <div className="fixed top-6 right-6 z-[9999]" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 border border-white/20 ${
            isMenuOpen ? 'bg-white/20 shadow-lg' : ''
          }`}
          title="演示设置"
        >
          <Cog6ToothIcon className={`w-6 h-6 transition-transform duration-300 ${
            isMenuOpen ? 'rotate-180' : ''
          }`} />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-3 w-64 rounded-xl bg-gray-900/90 backdrop-blur-md border border-white/20 shadow-2xl">
            <div className="p-4 space-y-6">
              {/* 主题设置 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  演示主题
                </label>
                <select
                  value={currentTheme}
                  onChange={(e) => handleThemeChange(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/10 focus:border-white/30 focus:ring focus:ring-white/10 focus:outline-none transition-colors"
                >
                  {THEMES.map(theme => (
                    <option key={theme.id} value={theme.id} className="bg-gray-900">
                      {theme.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 过渡效果设置 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  切换动画
                </label>
                <select
                  value={transition}
                  onChange={(e) => setTransition(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/10 focus:border-white/30 focus:ring focus:ring-white/10 focus:outline-none transition-colors"
                >
                  {TRANSITIONS.map(trans => (
                    <option key={trans.id} value={trans.id} className="bg-gray-900">
                      {trans.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 分隔线 */}
              <div className="border-t border-white/10"></div>

              {/* 快捷键提示 */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-white/80">快捷键</h3>
                <div className="space-y-2 text-sm text-white/60">
                  <div className="flex justify-between">
                    <span>切换幻灯片</span>
                    <span className="text-white/40">← →</span>
                  </div>
                  <div className="flex justify-between">
                    <span>退出全屏</span>
                    <span className="text-white/40">ESC</span>
                  </div>
                  <div className="flex justify-between">
                    <span>进入全屏</span>
                    <span className="text-white/40">F</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 