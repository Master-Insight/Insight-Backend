import { Joi, celebrate, Segments } from 'celebrate';

const serviceValidationSchema = Joi.object({
  title: Joi.string().max(250).required().messages({
    'string.base': 'El título debe ser un texto.',
    'string.max': 'El título no puede superar los 250 caracteres.',
    'any.required': 'El título es obligatorio.',
  }),
  slug: Joi.string().required().messages({
    'string.base': 'El slug debe ser un texto.',
    'any.required': 'El slug es obligatorio.',
  }),
  description: Joi.string().allow(null, '').messages({
    'string.base': 'La descripción debe ser un texto.',
  }),
  price: Joi.number().positive().allow(null).messages({
    'number.base': 'El precio debe ser un número.',
    'number.positive': 'El precio debe ser un número positivo.',
  }),
  maintenance: Joi.number().positive().allow(null).messages({
    'number.base': 'El mantenimiento debe ser un número.',
    'number.positive': 'El mantenimiento debe ser un número positivo.',
  }),
  image: Joi.string().uri().allow(null, '').messages({
    'string.base': 'La imagen debe ser un texto.',
    'string.uri': 'La imagen debe ser una URL válida.',
  }),
  characteristics: Joi.string().allow(null, '').messages({
    'string.base': 'Las características deben ser un texto.',
  }),
  tags: Joi.array().items(Joi.string()).messages({
    'array.base': 'Las etiquetas deben ser un arreglo de textos.',
    'string.base': 'Cada etiqueta debe ser un texto.',
  }),
});

// Validaciones específicas para las rutas
export const validateCreateService = celebrate({
  [Segments.BODY]: serviceValidationSchema,
});

export const validateUpdateService = celebrate({
  [Segments.BODY]: serviceValidationSchema,
});