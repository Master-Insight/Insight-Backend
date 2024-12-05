import { Schema, model } from 'mongoose'
import { PROJECT_PRORITY, PROJECT_STATUS } from '../../utils/valueList.js';
import Comments from '../../projects_comments/data/model.js'

const thisSchema = new Schema({
  // basic properties
  title: { type: String, required: true, maxLength: 250 },
  description: { type: String },
  projectId: { type: Schema.Types.ObjectId, ref: 'projects', required: true, },
  parentTaskId: { type: Schema.Types.ObjectId, ref: 'projects_task', default: null, },
  subtasks: [{ type: Schema.Types.ObjectId, ref: 'projects_task', }],

  // aditional properties
  assignedTo: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  status: { type: String, enum: PROJECT_STATUS, default: 'nueva' },
  teststatus: { type: String, enum: PROJECT_STATUS, default: 'pendiente' },
  priority: { type: String, enum: PROJECT_PRORITY, default: 'media' },

  // data of conection
  created: { type: Date, default: Date.now, immutable: true, },
  updated: { type: Date, default: Date.now, },
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

// Middleware: Al buscar tareas, las relacionadas con los usuarios
thisSchema.pre('find', function (next) {
  this
    .populate({
      path: 'assignedTo',
      select: '_id full_name'
    })
  next();
})

// Middleware: Al eliminar una tarea, elimina los comentarios relacionados
thisSchema.pre('findOneAndDelete', async function (next) {
  const taskId = this.getQuery()['_id'];

  // Eliminar comentarios relacionados
  await Comments.deleteMany({ taskId });

  next();
});

const dataModel = model('projects_task', thisSchema)

export default dataModel