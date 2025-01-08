import { Schema, model } from 'mongoose'

const thisSchema = new Schema({
  // basic properties
  title: {
    type: String, required: true,
    maxLength: 250
  },
  slug: {
    type: String, unique: true, required: true,
    lowercase: true, trim: true
  },
  description: {
    type: String,
    maxLength: 2000
  },
  price: {
    type: Number, required: true,
    min: 0
  },
  maintenance: {
    type: Number, default: 0,
    min: 0,
  },
  image: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i.test(v);
      },
      message: 'Debe ser una URL válida de imagen.'
    }
  },
  characteristics: {
    type: String,
    maxLength: 500
  },
  tags: {
    type: [String], default: [],
    validate: {
      validator: function (v) {
        return v.length <= 10;
      },
      message: 'Un servicio puede tener un máximo de 10 etiquetas.'
    }
  },

  // Campos adicionales
  serviceType: {
    type: String, required: true,
    enum: ['web_static', 'web_dynamic', 'app_web', 'app_mobile', 'data_analysis'],
  },
  complexityLevel: {
    type: String, required: true,
    enum: ['low', 'medium', 'high'],
  },

  // data of conection
  created: { type: Date, default: Date.now, immutable: true, },
  updated: { type: Date, default: Date.now, }
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

const dataModel = model('services', thisSchema)

export default dataModel
