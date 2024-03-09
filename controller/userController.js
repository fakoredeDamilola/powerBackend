const User = require("../models/UserModel");
const { generateToken } = require("../util");

const registerUser = async (req, res) => {
  const { name, password, secretKey } = req.body;

  console.log({ name, password, secretKey });
  const userExists = await User.findOne({ name });

  if (userExists) {
    res.status(400);
    throw new Error("User exists");
  }
  let isAdmin = false;
  if (secretKey && secretKey === process.env.JWT_SECRETE) {
    isAdmin = true;
  }
  const user = await User.create({
    name,
    password,
  });
  console.log({ user });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred !");
  }
};

const authUser = async (req, res) => {
  const { name, password } = req.body;
  console.log({ name, password });
  const user = await User.findOne({ name });
  console.log({ user });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password !");
  }
};

module.exports = { registerUser, authUser };
