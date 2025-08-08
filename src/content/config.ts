import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // 'data' or 'content' depending on your needs
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string().transform(str => new Date(str)), // 日付をDateオブジェクトに変換
    author: z.string().default('Unknown'), // デフォルト値の設定
    tags: z.array(z.string()).optional(), // オプショナルな配列
    image: z.string().optional(), // オプショナルな画像パス
    draft: z.boolean().default(false),
    projects: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};
