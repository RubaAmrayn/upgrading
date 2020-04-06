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

exports.insertQualification = async (req, reply) => {
  mysql.query(
    `
  INSERT INTO upgrading.educational_qualifications
(
universty_name,
graduation_year,
users_user_id,
qualification_title_id)
VALUES
(?,?,?,?);
  `,
    [
      req.body.universty_name,
      req.body.graduation_year,
      req.body.user_id,
      req.body.qualification_title.title_id
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
exports.getOneEducationalQualifications = async (req, reply) => {
  mysql.query(
    `
  SELECT 
    eq.qualification_id,
    eq.universty_name,
    eq.graduation_year,
    eq.users_user_id,
    u.first_name,
    u.middle_name,
    u.last_name,
    ed.title_id,
    ed.ar_title,
    ed.en_title
FROM
    upgrading.educational_qualifications eq
LEFT JOIN users u on u.user_id = eq.users_user_id
LEFT join qualification_titles ed on ed.title_id = qualification_title_id
where eq.users_user_id = ?
  `,
    [req.params.user_id],
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        reply.send(result);
      }
    }
  );
};
exports.deleteOneEducaionalQualifications = async (req, reply) => {
  mysql.query(
    `
    START TRANSACTION;
    DELETE FROM upgrading.educational_attachements
    WHERE
      educational_qualifications_id = ?;
    DELETE FROM upgrading.educational_qualifications 
    WHERE
        qualification_id = ?;
    COMMIT;
  `,
    [req.params.qualification_id, req.params.qualification_id],
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        reply.send(result);
      }
    }
  );
};
exports.updatePersonInfo = async (req, reply) => {
  mysql.query(
    `
  UPDATE upgrading.users
  SET
  first_name = ?,
  middle_name = ?,
  last_name = ?,
  date_of_birth = ?,
  phone = ?,
  email = ?
  WHERE user_id = ?;
  `,
    [
      req.body.first_name,
      req.body.middle_name,
      req.body.last_name,
      req.body.date_of_birth,
      req.body.phone,
      req.body.email,
      req.body.user_id
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
