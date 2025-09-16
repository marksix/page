export default {
  async fetch(request, env) {
    // 从目录里找静态文件
    let res = await env.ASSETS.fetch(request);

    // 如果 404 且请求的是 HTML，就回退到 index.html（适合单页面应用）
    if (res.status === 404 && request.headers.get("accept")?.includes("text/html")) {
      return env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
    }
    return res;
  }
}
