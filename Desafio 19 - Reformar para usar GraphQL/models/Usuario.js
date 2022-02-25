const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  _id: {},
});

module.exports = model("User", userSchema);
