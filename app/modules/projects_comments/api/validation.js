import { Joi, Segments } from 'celebrate';

const validSchema = {
  // Validación para crear un comentario
  create: {
    [Segments.PARAMS]: Joi.object().keys({
      tid: Joi.string().hex().length(24).required(), // Validación para el ID de la tarea
    }),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().max(250).required(),
      content: Joi.string().optional(),
      users: Joi.array().items(Joi.string().hex().length(24)).required(),
      comments: Joi.array().items(Joi.object()).optional().allow('')
    }),
  },

  // Validación para obtener comentarios (opcional, dependiendo de los filtros o parámetros esperados)
  get: {
    [Segments.PARAMS]: Joi.object().keys({
      tid: Joi.string().hex().length(24).optional(), // Para rutas con o sin `:tid`
    }),
  },

  // Validación para obtener un comentario específico por ID
  getById: {
    [Segments.PARAMS]: Joi.object().keys({
      tid: Joi.string().hex().length(24).required(),
      eid: Joi.string().hex().length(24).required(),
    }),
  },

  // Validación para actualizar un comentario por ID
  updateId: {
    [Segments.PARAMS]: Joi.object().keys({
      eid: Joi.string().hex().length(24).required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().max(250).optional(),
      content: Joi.string().optional(),
      users: Joi.array().items(Joi.string().hex().length(24)).optional(),
      comments: Joi.array().items(Joi.object()).optional().allow(''),
    }),
  },

  // Validación para eliminar un comentario por ID
  deleteId: {
    [Segments.PARAMS]: Joi.object().keys({
      eid: Joi.string().hex().length(24).required(),
    }),
  },
}

export default validSchema;



