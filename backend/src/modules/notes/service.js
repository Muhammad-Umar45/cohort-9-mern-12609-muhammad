const Note = require("./model");
const ApiError = require("../../shared/errors/ApiError");
const mongoose = require("mongoose");

const createNote = async (noteData, userId) => {
  const { title, content } = noteData;

  const note = await Note.create({
    title,
    content,
    user: userId,
  });

  return note;
};
const getNotes = async (userId) => {
  return Note.find({ user: userId }).sort({ createdAt: -1 });
};

const getNoteById = async (noteId, userId) => {
  if (!mongoose.isValidObjectId(noteId)) {
    throw new ApiError(404, "Note not found");
  }
  const note = await Note.findOne({
    _id: noteId,
    user: userId,
  });

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  return note;
};

const updateNote = async (noteId, userId, noteData) => {
  if (!mongoose.isValidObjectId(noteId)) {
    throw new ApiError(404, "Note not found");
  }
  const note = await Note.findOneAndUpdate(
    {
      _id: noteId,
      user: userId,
    },
    {
      $set: noteData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  return note;
};

const deleteNote = async (noteId, userId) => {
  if (!mongoose.isValidObjectId(noteId)) {
    throw new ApiError(404, "Note not found");
  }
  const note = await Note.findOneAndDelete({
    _id: noteId,
    user: userId,
  });

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  return note;
};

const searchNotes = async (userId, searchQuery) => {
  const notes = await Note.find({
    user: userId,
    $or: [
      { title: { $regex: searchQuery, $options: "i" } },
      { content: { $regex: searchQuery, $options: "i" } },
    ],
  }).sort({ createdAt: -1 });

  return notes;
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  searchNotes,
};
