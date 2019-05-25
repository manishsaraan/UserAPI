const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const finduser = await User.findOne({
      email
    });

    // use with this email does not exist
    if (!finduser) {
      return res.status(400).json(["Wrong email"]);
    }

    const paswordMatch = await finduser.validPassword(
      password,
      finduser.password
    );

    if (!paswordMatch) {
      return res.json(["wrong password"]);
    }

    res.json(finduser);
  } catch (e) {
    console.log(e);
    res.status(500).json(["something went wrong"]);
  }
};

module.exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = new User({
      email
    });

    user.password = await user.setPassword(password);

    user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json(["something went wrong"]);
  }
};
