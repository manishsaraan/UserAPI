const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

UserSchema.methods.validPassword = async (password, hashPassword) => {
  const passwordMatch = await bcrypt.compare(password, hashPassword);

  return passwordMatch;
};

UserSchema.methods.setPassword = async password => {
  const hash = await bcrypt.hash(password, 10);

  return hash;
};

mongoose.model("User", UserSchema);
