// module.exports.login = function(req, reply) {
//   reply.send(req.params);
// };
const mysql = require("../../connection");
const secure = require("../../secure");

exports.login = async (req, reply) => {
  mysql.query(
    `
  SELECT 
    u.user_id,
    u.first_name,
    u.middle_name,
    u.last_name,
    u.date_of_birth,
    u.gender,
    u.username,
    u.phone,
    u.email,
    r.ar_role_name,
    r.en_role_name,
    r.role_id
FROM
    upgrading.users u
        LEFT JOIN
    roles_has_users rhu ON rhu.users_user_id = u.user_id
        LEFT JOIN
    roles r ON r.role_id = rhu.roles_role_id
WHERE
    u.username = ?
        AND password = ?
  `,
    [req.body.username, secure.encrypt(req.body.password)],
    (err, result) => {
      if (err) reply.send(err);
      else {
        reply.send(result);
      }
    }
  );
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
      secure.encrypt(req.body.password),
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
              let {
                first_name,
                middle_name,
                last_name,
                date_of_birth,
                gender,
                username,
                email,
                phone
              } = req.body;
              let user = Object.assign(
                {},
                {
                  first_name,
                  middle_name,
                  last_name,
                  date_of_birth,
                  gender,
                  username,
                  email,
                  phone
                },
                {
                  user_id: user_id,
                  role: {
                    role_id: 1,
                    ar_role_name: "متدرب",
                    en_role_name: "trainer"
                  }
                }
              );
              reply.send(user);
            }
          }
        );
      }
    }
  );
};
console.log("c: ", secure.encrypt("123456"));
