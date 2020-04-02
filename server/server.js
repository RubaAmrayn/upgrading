const server = require("fastify")();

server.route();

server.listen(3000, () => {
  console.log("server is running at port 3000");
});
