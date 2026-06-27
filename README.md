# My Serverless Blog

> 基于 Cloudflare Pages (前端) + Cloudflare Workers (后端) + GitHub (数据存储) 的全栈 Serverless 个人博客系统。

本项目旨在展示如何利用现代 Serverless 技术构建一个高性能、低成本且易于维护的个人博客。所有代码和内容均开源托管在 GitHub 上。

## 📁 项目结构
```text
my-blog/
├── README.md # 项目说明文档
├── content/ # 博客文章源数据 (Markdown)
│ ├── about.md # 关于页面
│ └── posts/ # 文章目录
│ └── first-post.md
├── backend/ # Cloudflare Workers 后端服务
│ ├── src/
│ │ └── index.ts # Worker 入口文件
│ ├── wrangler.toml # Worker 配置文件
│ └── package.json
└── frontend/ # Astro + Cloudflare Pages 前端项目
├── src/
│ ├── pages/ # 路由页面
│ └── components/ # 组件
├── astro.config.mjs
└── package.json
```

## 🚀 技术栈

-   **前端框架**: [Astro](https://astro.build/) - 以内容为中心的现代 Web 框架。
-   **前端托管**: [Cloudflare Pages](https://pages.cloudflare.com/) - 全球边缘网络部署。
-   **后端运行时**: [Cloudflare Workers](https://workers.cloudflare.com/) - 无服务器边缘计算。
-   **数据存储**: [GitHub](https://github.com/) - 作为 CMS 内容源及 Issue 评论存储。
-   **API 接口**: Cloudflare Workers 处理动态请求（如评论、阅读量统计）。

## 🛠️ 本地开发

### 前置要求

-   Node.js (v18+)
-   Git
-   pnpm / npm / yarn

### 1. 克隆项目

```bash
git clone https://github.com/your-username/my-blog.git
cd my-blog
```

### 2. 安装依赖并启动前端

```bash
cd frontend
npm install
npm run dev
```

前端将运行在 `http://localhost:4321` 。

### 3. 启动后端 (可选，仅开发 API 功能时)

```bash
cd backend
npm install
npm run dev

或使用 wrangler
wrangler dev
```

## 📦 部署指南

### 前端部署

1.  将 `frontend` 目录推送到 GitHub 仓库。
2.  登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) -> Pages -> 创建项目。
3.  连接 GitHub 仓库，选择 `frontend` 目录。
4.  构建命令设为 `npm run build`，输出目录设为 `dist`。

### 后端部署

1.  确保已登录 Wrangler CLI：`npx wrangler login`。
2.  在 `backend` 目录下运行：
```bash
npm run deploy
```

## 📄 许可证

MIT License