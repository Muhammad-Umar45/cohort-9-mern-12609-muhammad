const bcrypt = require("bcryptjs");

const User = require("../users/model");
const ApiError = require("../../shared/errors/ApiError");
const { generateToken } = require("../../shared/utils/jwt");
// Option B
const { BCRYPT_SALT_ROUNDS } = require("../../config/env");

const checkExistingUser = async (email) => {
    const user = await User.findOne({ email });

    if (user) {
        throw new ApiError(409, "User already exists");
    }
};

const hashPassword = async (password) => {
    return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
};

const createUser = async (userData) => {
    return User.create(userData);
};

const register = async (userData) => {
    await checkExistingUser(userData.email);

    const hashedPassword = await hashPassword(userData.password);

    const user = await createUser({
        ...userData,
        password: hashedPassword,
    });

    const userResponse = user.toObject();

    delete userResponse.password;

    return userResponse;
};
const login = async (loginData) => {
  const { email, password } = loginData;

  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Compare password
  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate JWT
  const token = generateToken({
    userId: user._id,
  });

  // Remove password
  const userResponse = user.toObject();

  delete userResponse.password;

  return {
    token,
    user: userResponse,
  };
};

module.exports = {
  register,
  login,
};