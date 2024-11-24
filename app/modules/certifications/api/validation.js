import { Joi, Segments } from 'celebrate';

const validSchema = {
  get: {
    [Segments.QUERY]: Joi.object().keys({
      user: Joi.string().optional().hex().length(24),
      _id: Joi.string().optional().hex().length(24),
      position: Joi.string().optional(),
      company: Joi.string().optional()
    }),
  },
}

export default validSchema;