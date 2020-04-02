// module.exports.login = function(req, reply) {
//   reply.send(req.params);
// };
const mysql = require("../../connection");

exports.login = async (req, reply) => {
  reply.send("login");
};
exports.register = async (req, reply) => {
  mysql.query(
    `
  INSERT INTO upgrading.users
  (
  first_name,
  middle_name,
  last_name,
  date_of_birth,
  phone,
  email,
  username,
  password,
  gender)
  VALUES
  (?,?,?,?,?,?,?,?,?);
  `,
    [
      req.body.first_name,
      req.body.middle_name,
      req.body.last_name,
      req.body.date_of_birth,
      req.body.phone,
      req.body.email,
      req.body.username,
      req.body.password,
      req.body.gender
    ],
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        reply.send(result);
      }
    }
  );
};
