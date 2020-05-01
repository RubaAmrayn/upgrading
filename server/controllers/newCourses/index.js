const mysql = require("../../connection");
const fs = require("fs");
const path = require("path");
const deleteFiles = (Files = []) => {
  if (Files.length > 0) {
    let promises = Files.map(filename => {
      return new Promise((resolve, reject) => {
        fs.unlink(path.join("./", filename.briefcase_path), err => {
          err ? reject(err) : resolve();
        });
      });
    });
    return Promise.all(promises);
  } else {
    return;
  }
};
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
          var course_id = result.insertId;
          var courseResult = result;
          if (req.body.course_requirements.length > 0) {
            // insert requirement and event
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
              async err => {
                if (err) {
                  let [
                    rows
                  ] = await mysql
                    .promise()
                    .query(
                      `DELETE FROM upgrading.courses WHERE course_id = ?;`,
                      [course_id]
                    );
                  console.log(rows);
                  reply.send(err);
                } else {
                  reply.send(courseResult);
                }
              }
            );
          } else {
            //insert only event
            mysql.query(
              `
            INSERT INTO upgrading.course_events
            (
            users_user_id,
            status_status_id,
            courses_course_id)
            VALUES
            (?,?,?);
            `,
              [req.body.user_id, 1, course_id],
              async err => {
                if (err) {
                  await mysql
                    .promise()
                    .query(
                      `DELETE FROM upgrading.courses WHERE course_id = ?;`,
                      [course_id]
                    );
                  console.log("failing when adding events");

                  reply.send(err);
                } else {
                  console.log("event inserted");
                  reply.send(courseResult);
                }
              }
            );
          }
        } else {
          // error in inserting course
        }
      }
    }
  );
};
const checkForPrevuisRequirements = async course_id => {
  let [rows] = await mysql.promise().query(
    `
  SELECT * FROM upgrading.courses_requirements WHERE courses_course_id = ?;
  
  `,
    [course_id]
  );
  let length = rows.length;
  return length > 0;
};
const deleteOldRequirementsAndUpdate = async payload => {
  let requirement_name = payload.course_requirements.map(requirement => [
    requirement.requirement_name,
    payload.course_id
  ]);
  let result = await mysql.promise().query(
    `
   START TRANSACTION;
  DELETE FROM upgrading.courses_requirements WHERE courses_course_id = ?;
  INSERT INTO upgrading.courses_requirements
  (
  requirement_name,
  courses_course_id)
  VALUES 
  ?;
  UPDATE upgrading.courses SET
  course_name = ?,
  daily_hours = ?,
  start_date = ?,
  end_date = ?,
  course_description = ?,
  course_price = ?,
  seats_number = ?
  WHERE course_id = ?;
  COMMIT;
  `,
    [
      payload.course_id,
      requirement_name,
      payload.course_name,
      payload.daily_hours,
      payload.start_date,
      payload.end_date,
      payload.course_description,
      payload.course_price,
      payload.seats_number,
      payload.course_id
    ]
  );
  return result;
};
const deleteOldRequirementsAndOnlyUpdateCourse = async payload => {
  let result = await mysql.promise().query(
    `
   START TRANSACTION;
  DELETE FROM upgrading.courses_requirements WHERE courses_course_id = ?;
  UPDATE upgrading.courses SET
  course_name = ?,
  daily_hours = ?,
  start_date = ?,
  end_date = ?,
  course_description = ?,
  course_price = ?,
  seats_number = ?
  WHERE course_id = ?;
  COMMIT;
  `,
    [
      payload.course_id,
      payload.course_name,
      payload.daily_hours,
      payload.start_date,
      payload.end_date,
      payload.course_description,
      payload.course_price,
      payload.seats_number,
      payload.course_id
    ]
  );
  return result;
};

const AddNewRequirementsAndUpdateCourse = async payload => {
  let requirement_name = payload.course_requirements.map(requirement => [
    requirement.requirement_name,
    payload.course_id
  ]);
  let result = mysql.promise().query(
    `
  START TRANSACTION;
  INSERT INTO upgrading.courses_requirements
  (
  requirement_name,
  courses_course_id)
  VALUES 
  ?;

  UPDATE upgrading.courses SET
  course_name = ?,
  daily_hours = ?,
  start_date = ?,
  end_date = ?,
  course_description = ?,
  course_price = ?,
  seats_number = ?
  WHERE course_id = ?;
  COMMIT;
  `,
    [
      requirement_name,
      payload.course_name,
      payload.daily_hours,
      payload.start_date,
      payload.end_date,
      payload.course_description,
      payload.course_price,
      payload.seats_number,
      payload.course_id
    ]
  );
  return result;
};
const UpdateOnlyCourse = async payload => {
  let result = mysql.promise().query(
    `
  UPDATE upgrading.courses SET
  course_name = ?,
  daily_hours = ?,
  start_date = ?,
  end_date = ?,
  course_description = ?,
  course_price = ?,
  seats_number = ?
  WHERE course_id = ?;
  `,
    [
      payload.course_name,
      payload.daily_hours,
      payload.start_date,
      payload.end_date,
      payload.course_description,
      payload.course_price,
      payload.seats_number,
      payload.course_id
    ]
  );
  return result;
};
exports.updateOneCourse = async (req, reply) => {
  if (await checkForPrevuisRequirements(req.body.course_id)) {
    if (req.body.course_requirements.length > 0) {
      let [rows] = await deleteOldRequirementsAndUpdate(req.body);
      reply.send(rows);
    } else {
      let [rows] = await deleteOldRequirementsAndOnlyUpdateCourse(req.body);
      reply.send(rows);
    }
  } else {
    if (req.body.course_requirements.length > 0) {
      let [rows] = await AddNewRequirementsAndUpdateCourse(req.body);
      reply.send(rows);
    } else {
      let [rows] = await UpdateOnlyCourse(req.body);
      reply.send(rows);
    }
  }
};

exports.deleteOneCourse = async (req, reply) => {
  mysql.query(
    `
    START TRANSACTION;
    DELETE FROM upgrading.course_events where courses_course_id = ?;
    DELETE FROM upgrading.courses_requirements WHERE courses_course_id = ?;
    DELETE FROM courses WHERE course_id = ?;
    COMMIT;
  `,
    [req.params.course_id, req.params.course_id, req.params.course_id],
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        reply.send(result);
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
    u.user_id = ? and c.current_status in (1,2);
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
const deletePreviuesPosterIfExsist = async payload => {
  let [rows] = await mysql.promise().query(
    `
    SELECT * FROM upgrading.courses_poster where courses_course_id = ?;
 `,
    [payload]
  );
  if (rows.length > 0) {
    await mysql.promise().query(
      `
     DELETE FROM upgrading.courses_poster where courses_course_id = ?;
    `,
      [payload]
    );
  } else {
    return;
  }
};

exports.uploadPoster = async (req, reply) => {
  await deletePreviuesPosterIfExsist(req.params.course_id);
  let file = req.files[0];
  let newPath = file.path.replace(/\\/g, "/");
  let Poster = [
    file.originalname,
    file.filename,
    newPath,
    req.params.course_id
  ];

  mysql.query(
    `
  INSERT INTO upgrading.courses_poster
  (
  poster_original_name,
  poster_name,
  poster_path,
  courses_course_id)
  VALUES 
  (?,?,?,?);
  `,
    [Poster[0], Poster[1], Poster[2], Poster[3]],
    async (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        if (result.insertId) {
          let [rows] = await mysql.promise().query(
            `
            SELECT * FROM upgrading.courses_poster where poster_id = ?;
         `,
            [result.insertId]
          );

          reply.send({ result, rows });
        }
      }
    }
  );
};

exports.getAllNewCourses = async (req, reply) => {
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
 c.current_status in (1,2);
  `,
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        reply.send(result);
      }
    }
  );
};
const deletePreviuesBriefcaseIfExsist = async payload => {
  let [rows] = await mysql.promise().query(
    `
    SELECT * FROM upgrading.briefcases where courses_course_id = ?;
 `,
    [payload]
  );
  if (rows.length > 0) {
    await mysql.promise().query(
      `
     DELETE FROM upgrading.briefcases where courses_course_id = ?;
    `,
      [payload]
    );
  } else {
    return;
  }
};

exports.uploadBriefcase = async (req, reply) => {
  await deletePreviuesBriefcaseIfExsist(req.params.course_id);
  let file = req.files[0];
  let newPath = file.path.replace(/\\/g, "/");
  let Briefcase = [
    file.originalname,
    file.filename,
    newPath,
    req.params.course_id
  ];
  mysql.query(
    `
    INSERT INTO upgrading.briefcases
    (
    briefcase_title,
    briefcase_original_name,
    briefcase_name,
    briefcase_path,
    courses_course_id
    )
    VALUES
    (?,?,?,?,?);
  `,
    [
      req.body.briefcaseTitle,
      Briefcase[0],
      Briefcase[1],
      Briefcase[2],
      Briefcase[3]
    ],
    async (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        if (result.insertId) {
          let [rows] = await mysql.promise().query(
            `
            SELECT * FROM upgrading.briefcases where briefcase_id = ?;
         `,
            [result.insertId]
          );

          reply.send({ result, rows });
        }
      }
    }
  );
};

exports.getOneCourseBriefcase = async (req, reply) => {
  mysql.query(
    `
    SELECT * FROM upgrading.briefcases WHERE courses_course_id = ?;
  `,
    [req.params.course_id],
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        reply.send(result);
      }
    }
  );
};
exports.deleteOneBriefcase = async (req, reply) => {
  mysql.query(
    `
    SELECT briefcase_path from upgrading.briefcases WHERE briefcase_id = ?;
    DELETE FROM upgrading.briefcases WHERE briefcase_id = ?;
  `,
    [req.params.briefcase_id, req.params.briefcase_id],
    async (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        await deleteFiles(result[0]);
        // delete attachcement from folder
        reply.send(result[1]);
      }
    }
  );
};

exports.getAllNewCourses = async (req, reply) => {
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
    c.current_status in (1,2);
    `,
    [],
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
