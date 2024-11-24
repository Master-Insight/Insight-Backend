import { Joi, Segments } from 'celebrate';
import { PROJECT_PRORITY, PROJECT_STATUS } from '../../utils/valueList.js';

const validSchema = {
  get: {
    [Segments.QUERY]: Joi.object().keys({
      title: Joi.string().max(250).optional(),
      projectId: Joi.string().hex().length(24).optional(),
      parentTaskId: Joi.string().hex().length(24).optional(),
      assignedTo: Joi.string().hex().length(24).optional(),
    }),
  },
  create: {
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().max(250).required(),
      description: Joi.string().optional(),
      projectId: Joi.string().hex().length(24).required(),
      parentTaskId: Joi.string().hex().length(24).optional(),
      assignedTo: Joi.array().items(Joi.string().hex().length(24)).optional(),
    }),
  },
  update: {
    [Segments.PARAMS]: Joi.string().hex().length(24).required(),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().max(250).optional(),
      description: Joi.string().optional(),
      projectId: Joi.string().hex().length(24).optional(),
      parentTaskId: Joi.string().hex().length(24).optional(),
      subtasks: Joi.array().items(Joi.string().hex().length(24)).optional(),
      assignedTo: Joi.array().items(Joi.string().hex().length(24)).optional(),
      status: Joi.string().valid(...PROJECT_STATUS).optional(),
      teststatus: Joi.string().valid(...PROJECT_STATUS).optional(),
      priority: Joi.string().valid(...PROJECT_PRORITY).optional(),
      comments: Joi.array().items(Joi.string().hex().length(24)).optional(),
    }),
  },
}

export default validSchema;