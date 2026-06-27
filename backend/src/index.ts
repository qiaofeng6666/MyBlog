import { Hono } from "hono";

const app = new Hono();

// 测试路由：访问 / 看看服务有没有通
app.get("/", (c) => c.text("后端服务正在运行！"));

// 发布文章的 API
app.post("/publish", async (c) => {
  // 从环境变量拿 Token 和仓库名
  const token = c.env.GITHUB_TOKEN; 
  const repo = c.env.GITHUB_REPO;

  if (!token) {
    return c.json({ error: "未配置 GITHUB_TOKEN" }, 500);
  }

  // 1. 获取前端发来的数据
  const body = await c.req.json();
  const { title, content } = body;

  if (!title || !content) {
    return c.json({ error: "标题和内容不能为空" }, 400);
  }

  // 2. 准备 GitHub API 需要的数据
  const slug = title.toLowerCase().replace(/\s+/g, '-'); // 简单的生成文件名逻辑
  const path = `frontend/src/content/blog/${slug}.md`; // 注意路径，要更新前端的 content 目录
  
  // 把内容转成 Base64 (GitHub API 要求)
  const base64Content = btoa(unescape(encodeURIComponent(content)));

  try {
    // 3. 调用 GitHub API 提交文件
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "MyBlog-Worker" // GitHub API 强制要求 User-Agent
      },
      body: JSON.stringify({
        message: `docs: 发布新文章《${title}》`,
        content: base64Content,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      // 如果 GitHub 报错，把错误信息返回出来
      return c.json({ error: "GitHub API 错误", details: result }, 500);
    }

    return c.json({ success: true, message: "文章发布成功！", url: result.content.html_url });

  } catch (err) {
    return c.json({ error: "服务器内部错误" }, 500);
  }
});

export default app;
