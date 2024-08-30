const env = require("./env");
const mongoose = require("mongoose");

const mongoUri = `mongodb://${env.db_username}:${env.db_password}@${env.db_host}:${env.db_port}/${env.db_name}?authSource=admin`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 5,
};

mongoose
  .connect(mongoUri, options)
  .then(() => {
    console.log("Connected successfully to MongoDB!");
  })
  .catch((error) => {
    console.error("Cannot connect to MongoDB", error);
  });

module.exports = mongoose;
