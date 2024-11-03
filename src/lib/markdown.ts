import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { visit } from 'unist-util-visit';

export interface Slide {
  content: string;
  raw: string;
}

// 自定义插件：处理代码块的语言
function rehypeCodeLanguage() {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre' && node.children[0]?.tagName === 'code') {
        const className = node.children[0].properties.className || [];
        const language = className[0]?.replace('language-', '') || 'plaintext';
        node.properties.className = [
          ...(node.properties.className || []),
          'relative',
          'group'
        ];
        node.children.unshift({
          type: 'element',
          tagName: 'span',
          properties: {
            className: ['absolute top-0 right-0 px-2 py-1 text-xs text-gray-400 bg-gray-800 rounded-bl'],
          },
          children: [{ type: 'text', value: language }],
        });
      }
    });
  };
}

// 移除 YAML 前置内容
function removeYamlFrontmatter(content: string): string {
  // 匹配 YAML 前置内容（包括开始和结束的 --- 或 +++）
  const yamlPattern = /^(---|\+\+\+)[\s\S]+?(---|\+\+\+)\s*\n/;
  return content.replace(yamlPattern, '');
}

export async function parseMarkdown(content: string): Promise<Slide[]> {
  console.log('开始解析 Markdown 内容');
  console.log('原始内容:', content);
  
  // 首先移除 YAML 前置内容
  content = removeYamlFrontmatter(content);
  console.log('移除 YAML 后的内容:', content);
  
  // 将内容按行分割
  const lines = content.split('\n');
  const slides: string[] = [];
  let currentSlide = '';
  
  console.log('开始逐行处理，总行数:', lines.length);
  
  // 遍历每一行
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    console.log(`处理第 ${i + 1} 行:`, line);
    
    // 如果是分隔符 ---，创建新的幻灯片
    if (line === '---') {
      console.log('发现分隔符 ---');
      if (currentSlide.trim()) {
        console.log('保存当前幻灯片:', currentSlide.trim());
        slides.push(currentSlide.trim());
      }
      currentSlide = '';
      continue;
    }
    
    // 如果是标题行，创建新的幻灯片
    if (line.match(/^#{1,6}\s/)) {
      console.log('发现标题行:', line);
      if (currentSlide.trim()) {
        console.log('保存当前幻灯片:', currentSlide.trim());
        slides.push(currentSlide.trim());
      }
      currentSlide = line;
    } else {
      // 将当前行添加到当前幻灯片
      currentSlide += (currentSlide ? '\n' : '') + line;
    }
  }
  
  // 添加最后一个幻灯片
  if (currentSlide.trim()) {
    console.log('保存最后一个幻灯片:', currentSlide.trim());
    slides.push(currentSlide.trim());
  }

  console.log('分页结果，总页数:', slides.length);
  slides.forEach((slide, index) => {
    console.log(`第 ${index + 1} 页内容:`, slide);
  });

  // 处理每个幻灯片的内容
  console.log('开始处理幻灯片 HTML');
  const processedSlides = await Promise.all(
    slides
      .filter(slide => slide.length > 0)
      .map(async (slideContent) => {
        try {
          const file = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkHtml, { sanitize: false })
            .use(rehypeSlug)
            .use(rehypeAutolinkHeadings)
            .use(rehypeHighlight, { 
              ignoreMissing: true,
              detect: true 
            })
            .use(rehypeCodeLanguage)
            .process(slideContent);

          return {
            content: String(file),
            raw: slideContent
          };
        } catch (error) {
          console.error('处理幻灯片出错:', error);
          return {
            content: `<p class="text-red-500">Error processing slide</p>`,
            raw: slideContent
          };
        }
      })
  );

  console.log('处理完成，最终幻灯片数:', processedSlides.length);
  return processedSlides;
} 