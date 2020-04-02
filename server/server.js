const server = require("fastify")();

const routers = require("./routers/auth/index");
console.log(routers);
routers.forEach(route => {
  server.route(route);
});

server.listen(3000, () => {
  console.log("server is running at port 3000");
});
