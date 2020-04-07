const multer = require("fastify-multer");
const server = require("fastify")();
const Edustorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/educatioalAttachements");
  },
  filename: function(req, file, cb) {
    let splitExt = file.originalname.split(".");
    let getExt = splitExt[splitExt.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + getExt);
  }
});
const eduUpload = multer({ storage: Edustorage });
server.register(multer.contentParser);
exports.eduUpload = eduUpload;
