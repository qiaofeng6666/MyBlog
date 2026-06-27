# My Serverless Blog

> 基于 Cloudflare Pages (前端) + Cloudflare Workers (后端) + GitHub (数据存储) 的全栈 Serverless 个人博客系统。

本项目旨在展示如何利用现代 Serverless 技术构建一个高性能、低成本且易于维护的个人博客。所有代码和内容均开源托管在 GitHub 上。

## 📁 项目结构
`text
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
`