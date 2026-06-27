// frontend/src/content.config.js
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 定义一个名为 'blog' 的集合
const blog = defineCollection({
  // 告诉 Astro 去读取 src/content/blog 目录下的 .md 文件
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  // 定义文章头部元数据的格式和类型，方便报错提示
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string().optional(),
  }),
});

export const collections = { blog };
