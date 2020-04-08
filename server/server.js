const server = require("fastify")();
const multer = require("fastify-multer");
server.register(multer.contentParser);
// const path = require("path");
// server.register(
//   require("fastify-static", {
//     root: path.join(__dirname, "/"),
//     prefix: "/"
//   })
// );
const routers = require("./routers/main");
routers.forEach(route => {
  server.route(route);
});
// server.get("/public/:folder/:file_name", (req, reply) => {
//   reply.send(`uploads/${req.params.folder}/${req.params.file_name}`);
// });
server.listen(3000, () => {
  console.log("server is running at port 3000");
});
exports = server;
