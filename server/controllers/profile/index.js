const mysql = require("../../connection");
const fs = require("fs"),
  path = require("path");

let deleteFiles = (dir, Files = []) => {
  let promises = Files.map(filename => {
    return new Promise((resolve, reject) => {
      fs.unlink(path.join(dir, filename.attachement_path), err => {
        err ? reject(err) : resolve();
      });
    });
  });
  return Promise.all(promises);
};

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
exports.updateQualification = async (req, reply) => {
  mysql.query(
    `
  UPDATE upgrading.educational_qualifications
  SET
  universty_name = ?,
  graduation_year = ?,
  qualification_title_id = ?
  WHERE qualification_id = ?
  `,
    [
      req.body.universty_name,
      req.body.graduation_year,
      req.body.qualification_title.title_id,
      req.body.qualification_id
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
    SELECT attachement_path FROM upgrading.educational_attachements where educational_qualifications_id = ?;
    DELETE FROM upgrading.educational_attachements
    WHERE
      educational_qualifications_id = ?;
    DELETE FROM upgrading.educational_qualifications 
    WHERE
        qualification_id = ?;
    COMMIT;
  `,
    [
      req.params.qualification_id,
      req.params.qualification_id,
      req.params.qualification_id
    ],
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        deleteFiles("./", result[1]);
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
exports.uplaodEducationalAttachement = async (req, reply) => {
  let qualification_id = req.params.qualification_id;
  let files = req.files.map(file => {
    let newPath = file.path.replace(/\\/g, "/");
    return [
      file.originalname,
      file.filename,
      file.mimetype,
      newPath,
      qualification_id
    ];
  });
  mysql.query(
    `
  INSERT INTO upgrading.educational_attachements
  (
  original_attachement_name,
  attachement_name,
  mime_type,
  attachement_path,
  educational_qualifications_id)
  VALUES ?;
  `,
    [files],
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        reply.send(result);
      }
    }
  );
};

exports.getAllEducationalAttchements = async (req, reply) => {
  mysql.query(
    `
    SELECT * FROM upgrading.educational_attachements where educational_qualifications_id = ?;  
  `,
    [req.params.qualification_id],
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        reply.send(result);
      }
    }
  );
};

exports.deleteOneEducaionalAttachements = async (req, reply) => {
  mysql.query(
    `DELETE FROM upgrading.educational_attachements where educational_attachement_id = ?;`,
    [req.params.educational_attachement_id],
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        reply.send(result);
      }
    }
  );
};
// exports.serveEducationalAttchements = async (req, reply) => {
//   reply.send("uploads/" + req.params.path);
// };
/***
 * Experinces Controllers
 */
exports.getEXperincesTypes = async (req, reply) => {
  mysql.query(
    `
  SELECT * FROM upgrading.experince_types;
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

exports.getEXperincesLevels = async (req, reply) => {
  mysql.query(
    `
  SELECT * FROM upgrading.experince_levels;`,
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
exports.insertExperience = async (req, reply) => {
  mysql.query(
    `INSERT INTO upgrading.experinces
    (
    experince_name,
    start_date,
    end_date,
    Experince_types_id,
    users_user_id,
    experince_level)
    VALUES
    (?,?,?,?,?,?);`,
    [
      req.body.experience_name,
      req.body.start_date,
      req.body.end_date,
      req.body.Experience_types_id,
      req.body.user_id,
      req.body.experience_level
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

exports.getOneUserExperience = async (req, reply) => {
  mysql.query(
    `
  SELECT 
    e.experince_id,
    e.experince_name,
    e.start_date,
    e.end_date,
    et.type_id,
    et.ar_experince_type,
    et.en_experince_type,
    el.exp_level_id,
    el.ar_exp_level,
    el.en_exp_level,
    u.user_id,
    u.first_name,
    u.middle_name,
    u.last_name
FROM
    upgrading.experinces e
        LEFT JOIN
    experince_types et ON et.type_id = e.Experince_types_id
        LEFT JOIN
    experince_levels el ON el.exp_level_id = e.experince_level
        LEFT JOIN
    users u ON u.user_id = e.users_user_id
    where e.users_user_id = ?
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

exports.deleteOneExperience = async (req, reply) => {
  mysql.query(
    `
  START TRANSACTION;
  SELECT attachement_path FROM upgrading.experinces_attachements where Experinces_experince_id = ?;
  DELETE FROM upgrading.experinces_attachements
  WHERE
   Experinces_experince_id = ?;
  DELETE FROM upgrading.experinces 
  WHERE
    experince_id = ?;
  COMMIT;
  `,
    [req.params.experince_id, req.params.experince_id, req.params.experince_id],
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        deleteFiles("./", result[1]);
        reply.send(result);
      }
    }
  );
};
exports.updateExperince = async (req, reply) => {
  mysql.query(
    `
  UPDATE upgrading.experinces
SET
experince_name = ?,
start_date = ?,
end_date = ?,
Experince_types_id = ?,
experince_level = ?
WHERE experince_id = ?;
  `,
    [
      req.body.experience_name,
      req.body.start_date,
      req.body.end_date,
      req.body.Experince_types_id,
      req.body.experince_level,
      req.body.experince_id
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

exports.uplaodEexperienceAttachement = async (req, reply) => {
  let experience_id = req.params.experience_id;
  let files = req.files.map(file => {
    let newPath = file.path.replace(/\\/g, "/");
    return [
      file.originalname,
      file.filename,
      file.mimetype,
      newPath,
      experience_id
    ];
  });
  mysql.query(
    `
    INSERT INTO upgrading.experinces_attachements
    (
    original_attachement_name,
    attachement_name,
    mime_type,
    attachement_path,
    Experinces_experince_id)
    VALUES ?;
  `,
    [files],
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        reply.send(result);
      }
    }
  );
};

exports.getOneEexperienceAttachement = async (req, reply) => {
  mysql.query(
    `
  SELECT * FROM upgrading.experinces_attachements where Experinces_experince_id = ?;
  `,
    [req.params.experience_id],
    (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        reply.send(result);
      }
    }
  );
};
