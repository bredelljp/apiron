(() => {
  // src/index.js
  async function handleRequest(request) {
    if (request.method === "POST" && new URL(request.url).pathname === "/website_kpis") {
      const data = await request.json();
      const { name, url } = data;
      if (!name || !url) {
        return new Response("Name and URL are required", { status: 400 });
      }
      const responsePayload = {
        name,
        url,
        timestamp: new Date().toISOString()
      };
      return new Response(JSON.stringify(responsePayload), {
        headers: { "Content-Type": "application/json" },
        status: 200
      });
    } else if (request.method === "GET") {
      return new Response("Hello World!", { status: 200 });
    } else {
      return new Response("Not Found", { status: 404 });
    }
  }
  addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
})();
//# sourceMappingURL=index.js.map
