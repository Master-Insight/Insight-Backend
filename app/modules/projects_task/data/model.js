import { Schema, model } from 'mongoose'
import { PROJECT_PRORITY, PROJECT_STATUS } from '../../utils/valueList.js';

const thisSchema = new Schema({
  // basic properties
  title: { type: String, required: true, maxLength: 250 },
  description: { type: String },
  projectId: { type: Schema.Types.ObjectId, ref: 'projects', required: true, },
  parentTaskId: { type: Schema.Types.ObjectId, ref: 'projects_task', default: null, },
  subtasks: [{ type: Schema.Types.ObjectId, ref: 'projects_task', }],

  // aditional properties
  assignedTo: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  status: { type: String, enum: PROJECT_STATUS, default: 'new' },
  teststatus: { type: String, enum: PROJECT_STATUS, default: 'pending' },
  priority: { type: String, enum: PROJECT_PRORITY, default: 'medium' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'projects_comments', required: true }],

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
      path: 'assignedTo',
      select: '_id full_name'
    })
  next();
})

const dataModel = model('projects_task', thisSchema)

export default dataModel