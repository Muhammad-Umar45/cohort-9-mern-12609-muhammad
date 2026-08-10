const asyncHandler=require("../../shared/utils/asyncHandler")
const authService=require("./service")
const register =asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  res.status(201).json({
    success: true,
    message: "Controller reached successfully",
    data: user,
  });
});
const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

module.exports = {
  register,
  login,
};