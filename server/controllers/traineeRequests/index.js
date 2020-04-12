const mysql = require("../../connection");
exports.requestNewTrainee = async (req, reply) => {
  mysql.query(
    `
    INSERT INTO upgrading.trainee_requests
    (
    users_user_id,
    status_status_id)
    VALUES
    (?,?);
    `,
    [req.params.user_id, 6],
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        reply.send(result);
      }
    }
  );
};

exports.getOneTraineeRequest = async (req, reply) => {
  mysql.query(
    `
    SELECT 
    r.request_id,
    r.date_reqeust,
    r.notes,
    u.user_id,
    u.first_name,
    u.middle_name,
    u.last_name,
    s.status_id,
    s.ar_status_name,
    s.en_status_name
FROM
    upgrading.trainee_requests r 
    left join users u on u.user_id = r.users_user_id
    left join status s on s.status_id = r.status_status_id
    where u.user_id = ?
    ORDER BY 1;`,
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

exports.getAllActiveTraineeRequest = async (req, reply) => {
  mysql.query(
    `
    SELECT 
    r.request_id,
    r.date_reqeust,
    r.notes,
    u.user_id,
    u.first_name,
    u.middle_name,
    u.last_name,
    s.status_id,
    s.ar_status_name,
    s.en_status_name
FROM
    upgrading.trainee_requests r
        LEFT JOIN
    users u ON u.user_id = r.users_user_id
        LEFT JOIN
    status s ON s.status_id = r.status_status_id
WHERE
    s.status_id IN (2 , 6)
ORDER BY 1;
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
exports.getAllArchiveTraineeRequest = async (req, reply) => {
  mysql.query(
    `
    SELECT 
    r.request_id,
    r.date_reqeust,
    r.notes,
    u.user_id,
    u.first_name,
    u.middle_name,
    u.last_name,
    s.status_id,
    s.ar_status_name,
    s.en_status_name
FROM
    upgrading.trainee_requests r
        LEFT JOIN
    users u ON u.user_id = r.users_user_id
        LEFT JOIN
    status s ON s.status_id = r.status_status_id
WHERE
    s.status_id IN (3 , 4)
ORDER BY 1;
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
exports.AcceptOneTrainee = async (req, reply) => {
  mysql.query(
    `
  START TRANSACTION;
    UPDATE upgrading.roles_has_users 
    SET roles_role_id = 2 
    WHERE users_user_id = ?;
    UPDATE upgrading.trainee_requests 
    SET 
        status_status_id = 4
    WHERE
    request_id = ?;
    COMMIT;
    `,
    [req.body.user_id, req.body.request_id],
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        reply.send(result);
      }
    }
  );
};

exports.RejectOneTrainee = async (req, reply) => {
  mysql.query(
    `  
    UPDATE upgrading.trainee_requests 
    SET 
        status_status_id = 3,
        notes=?
    WHERE
    request_id = ?;
    `,
    [req.body.notes, req.body.request_id],
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        reply.send(result);
      }
    }
  );
};
