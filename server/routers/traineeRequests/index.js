const requestTrainee = require("../../controllers/traineeRequests");
module.exports = [
  {
    method: "POST",
    url: "/api/requestTrainee/requestNewTrainee/:user_id",
    handler: requestTrainee.requestNewTrainee
  },
  {
    method: "GET",
    url: "/api/requestTrainee/getOneTraineeRequest/:user_id",
    handler: requestTrainee.getOneTraineeRequest
  }
];
