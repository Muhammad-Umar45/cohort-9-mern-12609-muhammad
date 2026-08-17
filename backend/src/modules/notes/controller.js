const asyncHandler = require("../../shared/utils/asyncHandler");
const noteService = require("./service");

const createNote = asyncHandler(async (req, res) => {
  const note = await noteService.createNote(
    req.body,
    req.user._id
  );

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    data: note,
  });
});
const getNotes = asyncHandler(async (req, res) => {
  const notes = await noteService.getNotes(req.user._id);

  res.status(200).json({
    success: true,
    message: "Notes retrieved successfully",
    data: notes,
  });
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await noteService.getNoteById(
    req.params.id,
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: "Note retrieved successfully",
    data: note,
  });
});

const updateNote = asyncHandler(async (req, res) => {
  const note = await noteService.updateNote(
    req.params.id,
    req.user._id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    data: note,
  });
});

const deleteNote = asyncHandler(async (req, res) => {
  await noteService.deleteNote(
    req.params.id,
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});

const searchNotes = asyncHandler(async (req, res) => {
  const notes = await noteService.searchNotes(req.user._id, req.validatedQuery.q);

  res.status(200).json({
    success: true,
    message: "Notes searched successfully",
    data: notes,
  });
});

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  searchNotes,
};