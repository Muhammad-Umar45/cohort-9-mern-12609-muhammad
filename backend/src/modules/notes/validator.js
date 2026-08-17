const Joi = require("joi");

const createNoteSchema = Joi.object({
  title: Joi.string()
    .trim()
    .max(100)
    .required(),

  content: Joi.string()
    .required(),
});

const updateNoteSchema = Joi.object({
  title: Joi.string()
    .trim()
    .max(100),

  content: Joi.string(),
}).min(1);

const searchNoteSchema = Joi.object({
  q: Joi.string()
    .trim()
    .max(100)
    .required(),
});

module.exports = {
  createNoteSchema,
  updateNoteSchema,
  searchNoteSchema,
};