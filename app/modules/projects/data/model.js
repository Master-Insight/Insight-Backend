import { Schema, model } from 'mongoose'

const thisSchema = new Schema({
  // basic properties
  title: { type: String, required: true, maxLength: 250 },
  description: { type: String },
  users: [{ type: Schema.Types.ObjectId, ref: 'users', required: true }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'projects_comments', required: true }],

  // aditional properties

  // data of conection
  created: { type: Date, default: Date.now, immutable: true, },
  updated: { type: Date, default: Date.now, },
  connection: { type: Date, default: Date.now, },
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

thisSchema.pre('find', function (next) {
  this
    .populate({
      path: 'users',
      select: '_id full_name'
    })
  next();
})

const dataModel = model('projects', thisSchema)

export default dataModel