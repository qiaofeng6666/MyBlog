# Backend - Cloudflare Workers

本目录包含博客的后端逻辑，主要运行在 Cloudflare Workers 边缘网络上。

## 功能特性

-   **评论系统**: 通过 GitHub Issues API 实现的博客评论功能。
-   **API 代理**: 处理跨域请求，保护 GitHub Token 安全。
-   **数据统计**: (可选) 利用 Cloudflare D1 或 KV 存储文章阅读量。

## 环境变量

请在 `wrangler.toml` 中配置以下 Secret：

```toml
[vars]
GITHUB_REPO_OWNER = “your-username”
GITHUB_REPO_NAME = “my-blog”

敏感信息请使用 wrangler secret 命令设置
wrangler secret put GITHUB_TOKEN
```
## 本地开发

```bash

安装依赖
npm install

启动开发服务器
npm run dev
```

访问 `http://localhost:8787` 查看 Worker 响应。

## 部署

```bash
npm run deploy
```