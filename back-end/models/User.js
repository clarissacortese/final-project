const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (email, password) {
  // validation

  if (!email || !password) {
    throw Error("Please provide email and password");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please provide a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Please provide a stronger password (use at least one capital letter, a number and a symbol)"
    );
  }

  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = await this.create({ email, password: hash });
  return newUser;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Please provide email and password");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;

};

module.exports = model("User", userSchema);
