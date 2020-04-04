const mysql = require("../../connection");
exports.getEducationalTitles = async (req, reply) => {
  mysql.query(
    `
    SELECT * FROM upgrading.qualification_titles;
    `,
    [],
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        reply.send(result);
      }
    }
  );
};
