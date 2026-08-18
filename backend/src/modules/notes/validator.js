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

  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),
});
const paginationSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),
});

module.exports = {
  createNoteSchema,
  updateNoteSchema,
  searchNoteSchema,
  paginationSchema,
};