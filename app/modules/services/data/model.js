import { Schema, model } from 'mongoose'

const thisSchema = new Schema({
  // basic properties
  title: { type: String, required: true, maxLength: 250 },
  slug: { type: String, unique: true, required: true, },
  description: { type: String },
  price: { type: Number },
  maintenance: { type: Number },
  image: { type: 'string' },
  characteristics: { type: String },
  tags: {
    type: [String],
    default: [],
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
