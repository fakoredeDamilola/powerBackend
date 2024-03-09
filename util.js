const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: "30d",
  });
};

const checkToken = (token) => {
  try {
    const key = process.env.JWT_SECRETE;
    const decoded = jwt.verify(token, key);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  checkToken,
};
