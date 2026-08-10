const ApiError = require("../shared/errors/ApiError");
const { verifyToken } = require("../shared/utils/jwt");
const User = require("../modules/users/model");
const asyncHandler = require("../shared/utils/asyncHandler");

const authenticate = asyncHandler(async (req, res, next) => {
  // Get Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new ApiError(401, "Unauthorized");
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new ApiError(401, "Unauthorized");
  }

  // Verify JWT
  let decoded;

try {
  decoded = verifyToken(token);
} catch {
  throw new ApiError(401, "Unauthorized");
}

  // Find user
  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }

  // Attach user to request
  req.user = user;

  next();
});

module.exports = authenticate;
