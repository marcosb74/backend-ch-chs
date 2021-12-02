const mongodb = {
  cnxStr: "mongodb://localhost/coderdesafio11",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000,
  },
};

module.exports = mongodb;
