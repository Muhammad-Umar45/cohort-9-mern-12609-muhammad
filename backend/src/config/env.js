require("dotenv").config();

const requiredEnvVariables = [
  "MONGO_URI",
  "JWT_SECRET",
];

requiredEnvVariables.forEach((variable) => {
  if (!process.env[variable]) {
    throw new Error(`${variable} is not defined in .env`);
  }
});

const BCRYPT_SALT_ROUNDS = Number(
  process.env.BCRYPT_SALT_ROUNDS || 10
);

if (
  !Number.isInteger(BCRYPT_SALT_ROUNDS) ||
  BCRYPT_SALT_ROUNDS < 4 ||
  BCRYPT_SALT_ROUNDS > 31
) {
  throw new Error(
    "BCRYPT_SALT_ROUNDS must be an integer between 4 and 31."
  );
}

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  BCRYPT_SALT_ROUNDS,
};