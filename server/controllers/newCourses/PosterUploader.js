const multer = require("fastify-multer");
const server = require("fastify")();
const Posterstorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/posterAttachements");
  },
  filename: function(req, file, cb) {
    let splitExt = file.originalname.split(".");
    let getExt = splitExt[splitExt.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + getExt);
  }
});
const PosterUpload = multer({ storage: Posterstorage });
server.register(multer.contentParser);
exports.PosterUpload = PosterUpload;
