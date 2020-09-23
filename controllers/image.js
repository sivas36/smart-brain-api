const Clarifai = require("clarifai");
const app = new Clarifai.App({
  apiKey: "beb1db09442c4ccfa0a5c613408348d2",
});

const handleApiCall = (req, res) => {
  app.models
    .predict("c0c0ac362b03416da06ab3fa36fb58e3", req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with api"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unabel to get count"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
