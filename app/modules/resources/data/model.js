import { Schema, model } from 'mongoose'
import { PROJECT_PRORITY, PROJECT_STATUS } from '../../utils/valueList.js';
import Comments from '../../projects_comments/data/model.js'

const thisSchema = new Schema({
  // basic properties
  title: { type: String, required: true, maxLength: 250 },
  description: { type: String },
  tags: [{ type: String }],
  url: { type: String },

  // aditional properties
  contribuitedBy: [{ type: Schema.Types.ObjectId, ref: 'users' }],


  // data of conection
  created: { type: Date, default: Date.now, immutable: true, },
  updated: { type: Date, default: Date.now, },
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

const dataModel = model('projects_task', thisSchema)

export default dataModel