const dotenv = require("dotenv");
dotenv.config();

const mongodb = {
  cnxStr: process.env.CONNECTION,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000,
  },
};

module.exports = mongodb;
