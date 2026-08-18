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
const getNotes = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [notes, total] = await Promise.all([
    Note.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Note.countDocuments({ user: userId }),
  ]);

  return {
    notes,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
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

const searchNotes = async (userId, searchQuery, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const filter = {
    user: userId,
    $or: [
      { title: { $regex: searchQuery, $options: "i" } },
      { content: { $regex: searchQuery, $options: "i" } },
    ],
  };

  const [notes, total] = await Promise.all([
    Note.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Note.countDocuments(filter),
  ]);

  return {
    notes,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  searchNotes,
};
