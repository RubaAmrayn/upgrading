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
        let user_id = result.insertId;
        mysql.query(
          `
          INSERT INTO upgrading.roles_has_users
          (
          roles_role_id,
          users_user_id)
          VALUES
          (?,?);
        `,
          [1, user_id],
          error => {
            if (error) {
              reply.send(error);
            } else {
              let user = Object.assign({}, req.body, { user_id: user_id });
              reply.send(user);
            }
          }
        );
      }
    }
  );
};
