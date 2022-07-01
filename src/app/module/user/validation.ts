import { ValidationError } from "iyasunday";

import Joi, { isError } from "joi";

export default {
  register: {
    body: {
      schema: Joi.object({
        surname: Joi.string()
          .regex(/^[a-zA-Z]+[a-zA-Z0-9-_ ]*[a-zA-Z0-9]$/)
          .messages({
            "string.pattern.base": `Surname must not have special characters`,
          })
          .max(30)
          .trim(),
        firstname: Joi.string()
          .regex(/^[a-zA-Z]+[a-zA-Z0-9-_ ]*[a-zA-Z0-9]$/)
          .messages({
            "string.pattern.base": `Firstname must not have special characters`,
          }),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().required(),
      }),
    },
  },

  login: {
    body: {
      schema: Joi.object({
        email: Joi.string().email().trim().lowercase().required(),
        password: Joi.string().required(),
      }),
    },
  },
};
