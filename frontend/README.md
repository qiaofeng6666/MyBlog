# Frontend - Astro + Cloudflare Pages
本目录包含博客的前端界面，基于 Astro 框架构建，专为内容加载速度优化。

## 配置说明
Astro 配置文件 astro.config.mjs 中已配置好 Cloudflare 适配器：

```javascript
import { defineConfig } from ‘astro/config’;
import tailwind from ‘@astrojs/tailwind’;
import cloudflare from ‘@astrojs/cloudflare’;

export default defineConfig({
adapter: cloudflare(),
integrations: [tailwind()],
// 配置内容层读取根目录的 content 文件夹
build: {
assets: ‘_astro’,
},
});
```

## 目录结构

-   `src/pages/`: 页面路由文件。`index.astro` 为首页，`blog/[slug].astro` 为文章详情页。
-   `src/layouts/`: 页面布局模板。
-   `src/components/`: 可复用的 UI 组件（如 Header, Footer）。

## 内容管理

博客文章存放在项目根目录的 `../content/` 下。在 Astro 中可以通过配置 `content` 集合来读取它们。

## 开发命令

```bash
npm install # 安装依赖
npm run dev # 启动本地开发服务器
npm run build # 构建生产版本
npm run preview # 预览生产构建
```


