const mysql = require("../../connection");
module.exports.getMyCourse = async (req, reply) => {
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
      p.poster_id,
      p.poster_path,
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
      courses_poster p ON p.courses_course_id = c.course_id
          LEFT JOIN
      users u ON u.user_id = c.users_user_id
  WHERE
      u.user_id = ? and c.current_status = 9
  ORDER BY c.course_id DESC;
      `,
    [req.params.user_id],
    async (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        var output = [];

        for await (const course of result) {
          let [rows] = await mysql
            .promise()
            .query(
              `SELECT * FROM upgrading.courses_requirements where courses_course_id = ?;`,
              [course.course_id]
            )
            .catch(err => {
              console.log(err);
            });
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
