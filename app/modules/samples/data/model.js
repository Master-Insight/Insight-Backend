import { Schema, model } from 'mongoose'

const thisSchema = new Schema({
  // Propiedades básicas
  title: { type: String, required: true, maxLength: 250 },
  slug: { type: String, required: true, unique: true },
  description: { type: String },

  // Relación opcional con un proyecto
  project: { type: Schema.Types.ObjectId, ref: 'projects' },

  // Relación con usuarios
  users: [{ type: Schema.Types.ObjectId, ref: 'users', required: true }],

  // Propiedades adicionales
  media: [{ type: String }], // URLs o paths de recursos multimedia relacionados con la muestra
  deploy: { type: String },
  repository: { type: String },
  services: [{ type: Schema.Types.ObjectId, ref: 'services' }],

  // Datos de conexión
  created: { type: Date, default: Date.now, immutable: true },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
})

// Middleware para popular las relaciones
function populateRelated(next) {
  this.populate({ path: 'project', select: 'title description' });
  this.populate({ path: 'users', select: 'full_name email' });
  this.populate({ path: 'services', select: 'name description' });
  next();
}

thisSchema.pre('find', populateRelated);
thisSchema.pre('findOne', populateRelated);
thisSchema.pre('findById', populateRelated);

const dataModel = model('samples', thisSchema)

export default dataModel
