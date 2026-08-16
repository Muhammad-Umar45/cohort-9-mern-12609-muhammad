const express = require("express");

const authMiddleware = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const { createNoteSchema,updateNoteSchema,searchNoteSchema } = require("./validator");
const noteController = require("./controller");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  noteController.getNotes
);
router.get(
  "/search",
  authMiddleware,
  validate(searchNoteSchema,"query"),
  noteController.searchNotes
);
router.get(
  "/:id",
  authMiddleware,
  noteController.getNoteById
);
router.post(
  "/",
  authMiddleware,
  validate(createNoteSchema),
  noteController.createNote
);
router.patch(
  "/:id",
  authMiddleware,
  validate(updateNoteSchema),
  noteController.updateNote
);
router.delete(
  "/:id",
  authMiddleware,
  noteController.deleteNote
);
module.exports = router;