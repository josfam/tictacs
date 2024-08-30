module.exports = {
  db_name: process.env.MONGO_INITDB_DATABASE,
  db_username: process.env.MONGO_INITDB_ROOT_USERNAME,
  db_password: process.env.MONGO_INITDB_ROOT_PASSWORD,
  db_host: process.env.MONGO_HOST,
  db_port: process.env.MONGO_PORT,
};
