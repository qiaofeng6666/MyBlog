// backend/src/index.ts

import { Hono } from "hono";

type Env = {
  GITHUB_TOKEN: string;
  GITHUB_REPO: string;
};

const app = new Hono<{
  Bindings: Env;
}>();

// 定义我们“期望 GitHub 返回的结构”
type GitHubFileResponse = {
  content?: {
    html_url?: string;
    name?: string;
    path?: string;
    sha?: string;
    size?: number;
  };
  message?: string;
};

// 一个简单的类型守卫，只检查我们关心的字段是否存在
function isGitHubFileResponse(data: unknown): data is GitHubFileResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "content" in data &&
    typeof (data as any).content === "object" &&
    "html_url" in (data as any).content
  );
}

app.get("/", (c) => c.text("后端服务正在运行！"));

app.post("/publish", async (c) => {
  const token = c.env.GITHUB_TOKEN;
  const repo = c.env.GITHUB_REPO;

  if (!token) {
    return c.json({ error: "未配置 GITHUB_TOKEN" }, 500);
  }

  const body = await c.req.json();
  const { title, content } = body;

  if (!title || !content) {
    return c.json({ error: "标题和内容不能为空" }, 400);
  }

  const slug = title.toLowerCase().replace(/\s+/g, '-');
  const path = `frontend/src/content/blog/${slug}.md`;

  const base64Content = btoa(unescape(encodeURIComponent(content)));

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "MyBlog-Worker"
      },
      body: JSON.stringify({
        message: `docs: 发布新文章《${title}》`,
        content: base64Content,
      }),
    });

    // 这里先拿到 unknown
    const result: unknown = await response.json();

    if (!response.ok) {
      // 出错时，我们假设 GitHub 返回的结构是 { message?: string; ... }
      // 这里简单断言成 GitHubFileResponse 就够了，因为我们要的是 details
      return c.json(
        { error: "GitHub API 错误", details: result as GitHubFileResponse },
        500
      );
    }

    // 正常时，用类型守卫检查结构
    if (!isGitHubFileResponse(result)) {
      return c.json({ error: "GitHub 返回数据格式不正确" }, 500);
    }

    // 现在 result 是 GitHubFileResponse，有类型提示
    return c.json({
      success: true,
      message: "文章发布成功！",
      url: result.content?.html_url,
    });

  } catch (err) {
    return c.json({ error: "服务器内部错误" }, 500);
  }
});

export default app;
