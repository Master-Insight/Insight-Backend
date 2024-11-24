import { Joi, Segments } from 'celebrate';
import { LANGUAJES, PROFESSIONS, LINKSAPPS } from '../../utils/valueList.js';

const validSchema = {
  get: {
    [Segments.QUERY]: Joi.object().keys({
      _id: Joi.string().optional().hex().length(24),
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      code: Joi.string().optional().allow(''),
      example: Joi.string().optional().allow(''),
      contributedBy: Joi.string().optional().hex().length(24),
      // links: Debe ser un array de objetos { appName, url }, pero opcional en query
      'links.appName': Joi.string().valid(...LINKSAPPS).optional(),
      'links.url': Joi.string().uri().optional(),
      // Clasificators: Se pueden buscar por un string individual en la query
      professions: Joi.string().valid(...PROFESSIONS).optional(),
      languages: Joi.string().valid(...LANGUAJES).optional(),
      frameworks: Joi.string().optional(),
      libraries: Joi.string().optional(),
      createdAt: Joi.date().optional(),
      updatedAt: Joi.date().optional()
    }),
  },
  create: {
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      code: Joi.string().optional().allow(''),
      example: Joi.string().optional().allow(''),
      contributedBy: Joi.string().hex().length(24).required(),
      // links: array de objetos { appName, url }
      links: Joi.array().items(Joi.object({
        appName: Joi.string().valid(...LINKSAPPS).required(),
        url: Joi.string().uri().required()
      })).optional(),
      //Clasificators:
      professions: Joi.array().items(Joi.string().valid(...PROFESSIONS)).min(1).required(),
      languages: Joi.array().items(Joi.string().valid(...LANGUAJES)).min(1).required(),
      frameworks: Joi.array().items(Joi.string()).optional().allow(''),
      libraries: Joi.array().items(Joi.string()).optional().allow('')
    }),
  },
  update: {
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      code: Joi.string().optional().allow(''),
      example: Joi.string().optional().allow(''),
      contributedBy: Joi.string().optional(),
      // links: array de objetos { appName, url }
      links: Joi.array().items(Joi.object({
        appName: Joi.string().valid(...LINKSAPPS).required(),
        url: Joi.string().uri().required()
      })).optional(),
      //Clasificators:
      professions: Joi.array().items(Joi.string().valid(...PROFESSIONS)).optional(),
      languages: Joi.array().items(Joi.string().valid(...LANGUAJES)).optional(),
      frameworks: Joi.array().items(Joi.string()).optional(),
      libraries: Joi.array().items(Joi.string()).optional()
    }),
  },
}

export default validSchema;