import { Joi, celebrate, Segments } from 'celebrate';

// Esquema de validación
const sampleValidationSchema = Joi.object({
  title: Joi.string().max(250).required().messages({
    'string.base': 'El título debe ser un texto.',
    'string.max': 'El título no puede superar los 250 caracteres.',
    'any.required': 'El título es obligatorio.',
  }),
  slug: Joi.string().required().lowercase().trim().messages({
    'string.base': 'El slug debe ser un texto.',
    'string.lowercase': 'El slug debe estar en minúsculas.',
    'any.required': 'El slug es obligatorio.',
  }),
  description: Joi.string().allow(null, '').messages({
    'string.base': 'La descripción debe ser un texto.',
  }),
  project: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null, '').messages({
    'string.pattern.base': 'El ID del proyecto debe ser un ObjectId válido.',
  }),
  users: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .min(1)
    .required()
    .messages({
      'array.base': 'Los usuarios deben ser un arreglo de ObjectIds.',
      'string.pattern.base': 'Cada usuario debe ser un ObjectId válido.',
      'array.min': 'Debe haber al menos un usuario asignado.',
      'any.required': 'Los usuarios son obligatorios.',
    }),
  media: Joi.array().items(Joi.string().uri()).messages({
    'array.base': 'Los medios deben ser un arreglo de URLs.',
    'string.uri': 'Cada medio debe ser una URL válida.',
  }),
  deploy: Joi.string().uri().allow(null, '').messages({
    'string.base': 'El deploy debe ser un texto.',
    'string.uri': 'El deploy debe ser una URL válida.',
  }),
  repository: Joi.string().uri().allow(null, '').messages({
    'string.base': 'El repositorio debe ser un texto.',
    'string.uri': 'El repositorio debe ser una URL válida.',
  }),
  services: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .messages({
      'array.base': 'Los servicios deben ser un arreglo de ObjectIds.',
      'string.pattern.base': 'Cada servicio debe ser un ObjectId válido.',
    }),
});

// Validaciones específicas para las rutas
export const validateCreateSample = celebrate({
  [Segments.BODY]: sampleValidationSchema,
});

export const validateUpdateSample = celebrate({
  [Segments.BODY]: sampleValidationSchema,
});
