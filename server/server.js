const server = require("fastify")();
const multer = require("fastify-multer");
const path = require("path");

server.register(require("fastify-static"), {
  root: path.join(__dirname, "/"),
  prefix: "/public/" // optional: default '/'
});

server.get("/public/:file_name", function(req, reply) {
  reply.sendFile(`${req.params.file_name}`); // serving path.join(__dirname, 'public', 'myHtml.html') directly
});
server.register(multer.contentParser);
const routers = require("./routers/main");
routers.forEach(route => {
  server.route(route);
});
server.listen(3000, () => {
  console.log("server is running at port 3000");
});
exports = server;
