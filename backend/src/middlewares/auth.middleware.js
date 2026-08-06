const ApiError = require("../shared/errors/ApiError");
const { verifyToken } = require("../shared/utils/jwt");
const User = require("../modules/users/model");
const asyncHandler=require("../utils/asyncHandler")

const authenticate = asyncHandler(async (req, res, next) => {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized");
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = verifyToken(token);

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