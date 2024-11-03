import { promises as fs } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const demoPath = join(process.cwd(), 'src', 'examples', 'demo.md');
    const content = await fs.readFile(demoPath, 'utf-8');
    return new Response(content, {
      headers: {
        'Content-Type': 'text/markdown',
      },
    });
  } catch (error) {
    return new Response('Error loading demo file', { status: 500 });
  }
} 