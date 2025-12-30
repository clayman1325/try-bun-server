const server = Bun.serve({
  port: 3000,
  hostname: "localhost",
  async fetch(req) {
    return new Response("Hello using Bun!");
  },
});

console.log(`Server is running on ${server.url}`);