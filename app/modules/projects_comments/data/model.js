import { Schema, model } from 'mongoose'

const thisSchema = new Schema({
  // basic properties
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  taskId: { type: Schema.Types.ObjectId, ref: 'projects_task', required: true, },

  // data of conection
  created: { type: Date, default: Date.now, immutable: true, },
  updated: { type: Date, default: Date.now, }
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

thisSchema.pre('find', function (next) {
  this
    .populate({
      path: 'user',
      select: '_id full_name'
    })
  next();
})

const dataModel = model('projects_comments', thisSchema)

export default dataModel