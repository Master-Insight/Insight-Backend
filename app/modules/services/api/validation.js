import { Joi, celebrate, Segments } from 'celebrate';

// Esquema de validación
const serviceValidationSchema = Joi.object({
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
  description: Joi.string().allow(null, '').max(1000).messages({
    'string.base': 'La descripción debe ser un texto.',
    'string.max': 'La descripción no puede superar los 1000 caracteres.',
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'El precio debe ser un número.',
    'number.min': 'El precio no puede ser negativo.',
    'any.required': 'El precio es obligatorio.',
  }),
  maintenance: Joi.number().min(0).default(0).messages({
    'number.base': 'El mantenimiento debe ser un número.',
    'number.min': 'El mantenimiento no puede ser negativo.',
  }),
  image: Joi.string().uri().allow(null, '').messages({
    'string.base': 'La imagen debe ser un texto.',
    'string.uri': 'La imagen debe ser una URL válida.',
  }),
  characteristics: Joi.string().allow(null, '').max(500).messages({
    'string.base': 'Las características deben ser un texto.',
    'string.max': 'Las características no pueden superar los 500 caracteres.',
  }),
  tags: Joi.array()
    .items(Joi.string())
    .max(10)
    .messages({
      'array.base': 'Las etiquetas deben ser un arreglo de textos.',
      'string.base': 'Cada etiqueta debe ser un texto.',
      'array.max': 'No se pueden incluir más de 10 etiquetas.',
    }),
  serviceType: Joi.string()
    .valid('web_static', 'web_dynamic', 'app_web', 'app_mobile', 'data_analysis')
    .required()
    .messages({
      'string.base': 'El tipo de servicio debe ser un texto.',
      'any.only': 'El tipo de servicio debe ser uno de los valores permitidos.',
      'any.required': 'El tipo de servicio es obligatorio.',
    }),
  complexityLevel: Joi.string()
    .valid('low', 'medium', 'high')
    .required()
    .messages({
      'string.base': 'El nivel de complejidad debe ser un texto.',
      'any.only': 'El nivel de complejidad debe ser uno de los valores permitidos: low, medium, high.',
      'any.required': 'El nivel de complejidad es obligatorio.',
    }),
  active: Joi.bool(),
});

// Validaciones específicas para las rutas
export const validateCreateService = celebrate({
  [Segments.BODY]: serviceValidationSchema,
});

export const validateUpdateService = celebrate({
  [Segments.BODY]: serviceValidationSchema,
});
