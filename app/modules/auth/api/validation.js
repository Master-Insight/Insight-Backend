import { Joi, Segments } from 'celebrate';
import { DOCTYPE } from '../../utils/valueList.js';

const validSchema = {
  register: {
    [Segments.BODY]: Joi.object().keys({
      given_name: Joi.string().max(50).required(),
      family_name: Joi.string().max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      document: Joi.string().max(15).optional(),
      documenttype: Joi.string().valid(...DOCTYPE).optional(),
      photo: Joi.string().optional(),
      bio: Joi.string().optional(),
      birthday: Joi.date().optional(),
      phone: Joi.string().max(20).optional(),
    }),
  },
  login: {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  updatePassword: {
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string().min(6).required(),
    }),
  },
  email: {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  },
}

export default validSchema;