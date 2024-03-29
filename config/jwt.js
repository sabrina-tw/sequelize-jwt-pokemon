const jwt = require("jsonwebtoken");

const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("Missing secrets to sign JWT token");
  }
  return secret;
};

const createJWTToken = (username) => {
  const today = new Date();
  const exp = new Date(today);

  const secret = getJWTSecret();
  exp.setDate(today.getDate() + 60); // adding days

  // Method 1
  // const payload = {
  //   username: username,
  //   exp: Math.floor(Date.now() / 1000) + 10,
  // }; // 10 seconds
  // const token = jwt.sign(payload, secret);

  // Method 2
  const payload = { username };
  const token = jwt.sign(payload, secret, { expiresIn: "7d" });

  return token;
};

module.exports = createJWTToken;
