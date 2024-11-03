export interface SlideTheme {
  id: string;
  name: string;
  styles: {
    background: string;
    text: string;
    heading: string;
    link: string;
    code: string;
    bullet: string;
    slideBackground: string;
    prose?: string;
    container?: string;
    headingSize?: string;
  };
}

export const slideThemes: SlideTheme[] = [
  {
    id: 'modern',
    name: '现代简约',
    styles: {
      background: 'bg-gradient-to-br from-white to-gray-100',
      text: 'text-gray-800',
      heading: 'text-blue-600 font-bold',
      link: 'text-blue-500 hover:underline',
      code: 'bg-gray-800 text-gray-200 rounded px-1',
      bullet: 'text-blue-500',
      slideBackground: 'bg-gray-900',
      prose: 'prose-blue prose-lg',
      container: 'px-16 py-12',
      headingSize: 'text-4xl mb-8',
    },
  },
  {
    id: 'dark',
    name: '深邃夜空',
    styles: {
      background: 'bg-gradient-to-br from-gray-900 to-gray-800',
      text: 'text-gray-100',
      heading: 'text-blue-400 font-bold',
      link: 'text-blue-400 hover:underline',
      code: 'bg-black/50 text-gray-200 rounded px-1',
      bullet: 'text-blue-400',
      slideBackground: 'bg-black',
      prose: 'prose-invert prose-blue prose-lg',
      container: 'px-16 py-12',
      headingSize: 'text-4xl mb-8',
    },
  },
  {
    id: 'nature',
    name: '自然绿意',
    styles: {
      background: 'bg-gradient-to-br from-green-50 to-emerald-100',
      text: 'text-emerald-900',
      heading: 'text-emerald-700 font-bold',
      link: 'text-emerald-600 hover:underline',
      code: 'bg-emerald-900/10 text-emerald-800 rounded px-1',
      bullet: 'text-emerald-600',
      slideBackground: 'bg-emerald-900',
      prose: 'prose-emerald prose-lg',
      container: 'px-16 py-12',
      headingSize: 'text-4xl mb-8',
    },
  },
  {
    id: 'ocean',
    name: '海洋之心',
    styles: {
      background: 'bg-gradient-to-br from-blue-50 to-cyan-100',
      text: 'text-blue-900',
      heading: 'text-blue-700 font-bold',
      link: 'text-blue-600 hover:underline',
      code: 'bg-blue-900/10 text-blue-800 rounded px-1',
      bullet: 'text-blue-600',
      slideBackground: 'bg-blue-900',
      prose: 'prose-blue prose-lg',
      container: 'px-16 py-12',
      headingSize: 'text-4xl mb-8',
    },
  },
  {
    id: 'sunset',
    name: '晚霞',
    styles: {
      background: 'bg-gradient-to-br from-orange-50 to-pink-100',
      text: 'text-gray-800',
      heading: 'text-orange-600 font-bold',
      link: 'text-orange-500 hover:underline',
      code: 'bg-orange-900/10 text-orange-800 rounded px-1',
      bullet: 'text-orange-500',
      slideBackground: 'bg-orange-900',
      prose: 'prose-orange prose-lg',
      container: 'px-16 py-12',
      headingSize: 'text-4xl mb-8',
    },
  },
]; 