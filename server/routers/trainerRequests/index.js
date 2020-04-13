const requestTrainer = require("../../controllers/trainerRequests");
module.exports = [
  {
    method: "POST",
    url: "/api/requestTrainer/requestNewTrainer/:user_id",
    handler: requestTrainer.requestNewTrainer
  },
  {
    method: "GET",
    url: "/api/requestTrainer/getOneTrainerRequest/:user_id",
    handler: requestTrainer.getOneTrainerRequest
  },
  {
    method: "GET",
    url: "/api/requestTrainer/getAllActiveTrainerRequest",
    handler: requestTrainer.getAllActiveTrainerRequest
  },
  {
    method: "GET",
    url: "/api/requestTrainer/getAllAechiveTrainerRequest",
    handler: requestTrainer.getAllArchiveTrainerRequest
  },
  {
    method: "POST",
    url: "/api/requestTrainer/AcceptOneTrainer",
    handler: requestTrainer.AcceptOneTrainer
  },
  {
    method: "POST",
    url: "/api/requestTrainer/RejectOneTrainer",
    handler: requestTrainer.RejectOneTrainer
  }
];
