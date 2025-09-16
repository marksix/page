export default {
  async fetch(request, env) {
    // 从目录返回静态资源
    let res = await env.ASSETS.fetch(request);

    // 如果 404 且浏览器要 HTML，就回退到 index.html（适合单页面应用）
    if (res.status === 404 && request.headers.get("accept")?.includes("text/html")) {
      return env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
    }
    return res;
  }
}
