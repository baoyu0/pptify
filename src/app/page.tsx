import { FileUploader } from '@/components/FileUploader';
import { AntdProvider } from '@/components/AntdProvider';
import { DocumentTextIcon, PresentationChartBarIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <AntdProvider>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-[#0A1120] dark:to-[#0F172A] text-gray-900 dark:text-white overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/20 dark:to-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 dark:from-blue-500/20 dark:to-purple-500/20 blur-3xl" />
        </div>

        {/* 主要内容 */}
        <div className="relative max-w-screen-xl mx-auto px-4 py-16">
          {/* 头部区域 */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              PPTify
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              将 Markdown 优雅地转换为精美演示文稿，让创作更加轻松自如
            </p>
          </div>

          {/* 特性介绍 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* 简单易用卡片 */}
            <div className="group bg-white/90 dark:bg-white/5 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-white/10 hover:border-blue-500/50 transition-all duration-300">
              <div className="p-8 h-full flex flex-col">
                <div className="w-12 h-12 bg-blue-50 dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 dark:border-blue-500/20 group-hover:scale-110 group-hover:border-blue-500/40 transition-all duration-300">
                  <DocumentTextIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">
                  简单易用
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                  使用熟悉的 Markdown 语法，快速创建专业演示文稿，无需复杂的学习成本
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 text-sm text-gray-500 dark:text-gray-500">
                  支持标准 Markdown 语法
                </div>
              </div>
            </div>

            {/* 精美主题卡片 */}
            <div className="group bg-white/90 dark:bg-white/5 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <div className="p-8 h-full flex flex-col">
                <div className="w-12 h-12 bg-purple-50 dark:bg-gradient-to-br dark:from-purple-500/20 dark:to-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-100 dark:border-purple-500/20 group-hover:scale-110 group-hover:border-purple-500/40 transition-all duration-300">
                  <PresentationChartBarIcon className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:text-purple-500 dark:group-hover:text-purple-300 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400 group-hover:text-purple-500 dark:group-hover:text-purple-300 transition-colors">
                  精美主题
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                  多种精心设计的主题，让演示更具视觉冲击力，轻松打造专业级演示效果
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 text-sm text-gray-500 dark:text-gray-500">
                  内置多种精美主题
                </div>
              </div>
            </div>

            {/* 实时预览卡片 */}
            <div className="group bg-white/90 dark:bg-white/5 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-white/10 hover:border-indigo-500/50 transition-all duration-300">
              <div className="p-8 h-full flex flex-col">
                <div className="w-12 h-12 bg-indigo-50 dark:bg-gradient-to-br dark:from-indigo-500/20 dark:to-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 border border-indigo-100 dark:border-indigo-500/20 group-hover:scale-110 group-hover:border-indigo-500/40 transition-all duration-300">
                  <ArrowPathIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors">
                  实时预览
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                  即时查看演示效果，支持全屏模式和快捷键控制，让演示更加流畅自然
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 text-sm text-gray-500 dark:text-gray-500">
                  支持快捷键和手势控制
                </div>
              </div>
            </div>
          </div>

          {/* 上传区域 */}
          <div className="bg-white/90 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 dark:border-white/10">
            <FileUploader />
          </div>

          {/* 页脚 */}
          <footer className="mt-16 text-center text-gray-500 dark:text-gray-500 text-sm">
            <p>
              使用 Next.js + Tailwind CSS + Reveal.js 构建
              <span className="mx-2">·</span>
              <a 
                href="https://github.com/your-username/pptify" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-700 dark:hover:text-gray-400 transition-colors"
              >
                GitHub
              </a>
            </p>
          </footer>
        </div>
      </main>
    </AntdProvider>
  );
}
