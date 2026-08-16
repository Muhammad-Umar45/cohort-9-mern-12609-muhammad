const express = require("express");

const authRoutes = require("../modules/auth/routes");
const noteRoutes = require("../modules/notes/routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/notes", noteRoutes);

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is working",
  });
});

module.exports = router;