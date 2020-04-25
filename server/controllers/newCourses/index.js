const mysql = require("../../connection");

exports.AddNewCourse = async (req, reply) => {
  mysql.query(
    `
    INSERT INTO upgrading.courses
(
course_name,
daily_hours,
start_date,
end_date,
course_description,
course_price,
seats_number,
users_user_id,
current_status)
VALUES
(?,?,?,?,?,?,?,?,?);
    `,
    [
      req.body.course_name,
      req.body.daily_hours,
      req.body.start_date,
      req.body.end_date,
      req.body.course_description,
      req.body.course_price,
      req.body.seats_number,
      req.body.user_id,
      1
    ],
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        if (result.insertId > 0) {
          let course_id = result.insertId;
          let requirement_name = req.body.course_requirements.map(
            requirement => [requirement.requirement_name, result.insertId]
          );
          mysql.query(
            `   
                START TRANSACTION;
                INSERT INTO upgrading.courses_requirements
                    (
                    requirement_name,
                    courses_course_id)
                    VALUES 
                    ?;
                INSERT INTO upgrading.course_events
                    (
                    users_user_id,
                    status_status_id,
                    courses_course_id)
                    VALUES
                    (?,?,?);
                COMMIT;       
                `,
            [requirement_name, req.body.user_id, 1, course_id],
            async (err, result) => {
              if (err) {
                let [
                  rows
                ] = await mysql
                  .promise()
                  .query(`DELETE FROM upgrading.courses WHERE ?;`, [course_id]);
                console.log(rows);
                reply.send(err);
              } else {
                reply.send(result);
              }
            }
          );
        }
      }
    }
  );
};

exports.getOneNewCourses = async (req, reply) => {
  mysql.query(
    `
    SELECT 
    c.course_id,
    c.course_name,
    c.daily_hours,
    c.publish_date,
    c.start_date,
    c.end_date,
    c.course_description,
    c.course_price,
    c.seats_number,
    c.current_status,
    s.ar_status_name,
    s.en_status_name,
    u.user_id,
    u.first_name,
    u.middle_name,
    u.last_name
FROM
    courses c
        LEFT JOIN
    upgrading.status s ON s.status_id = c.current_status
        LEFT JOIN
    users u ON u.user_id = c.users_user_id
WHERE
    u.user_id = ?;
    `,
    [req.params.user_id],
    async (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        var output = [];

        for await (const course of result) {
          let [
            rows
          ] = await mysql
            .promise()
            .query(
              `SELECT * FROM upgrading.courses_requirements where courses_course_id = ?;`,
              [course.course_id]
            );
          var res = Object.assign({}, course, {
            course_requirements: rows
          });
          output.push(res);
        }
        reply.send(output);
      }
    }
  );
};
