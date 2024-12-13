import { Schema, model } from 'mongoose'
import Tasks from '../../projects_task/data/model.js'
import Comments from '../../projects_comments/data/model.js'

const thisSchema = new Schema({
  // basic properties
  title: { type: String, required: true, maxLength: 250 },
  description: { type: String },
  users: [{ type: Schema.Types.ObjectId, ref: 'users', required: true }],

  // aditional properties
  deploy: { type: String },
  repository: { type: String },

  // data of conection
  created: { type: Date, default: Date.now, immutable: true, },
  updated: { type: Date, default: Date.now, }
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

// Middleware: Al buscar un proyecto, se añaden los datos del usuario relacionado
function populateUsers(next) {
  this.populate({
    path: 'users',
    select: '_id full_name'
  });
  next();
}
thisSchema.pre('find', populateUsers);
thisSchema.pre('findOne', populateUsers);

// Middleware: Al eliminar un proyecto, elimina las tareas relacionadas
thisSchema.pre('findOneAndDelete', async function (next) {
  const projectId = this.getQuery()['_id'];

  // Obtener las tareas relacionadas antes de eliminarlas
  const tasks = await Tasks.find({ projectId }).select('_id');

  // Eliminar las tareas relacionadas
  await Tasks.deleteMany({ projectId });

  // Eliminar comentarios relacionados a las tareas
  if (tasks.deletedCount > 0) {
    await Comments.deleteMany({ taskId: { $in: tasks.map(task => task._id) } });
  }

  next();
});

const dataModel = model('projects', thisSchema)

export default dataModel

/* COMO ELIMINAR UN PROYECTOS Y SUS ASOCIADOS
// Modelo de Proyecto
const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

// Modelo de Tarea
const TaskSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  title: String,
  description: String,
  dueDate: Date,
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'] },
  createdAt: { type: Date, default: Date.now },
});

// Modelo de Comentario
const CommentSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
});

// Middleware: Al eliminar un proyecto, elimina las tareas relacionadas
ProjectSchema.pre('findOneAndDelete', async function (next) {
  const projectId = this.getQuery()['_id'];
  
  // Eliminar tareas relacionadas
  const tasks = await Task.deleteMany({ projectId });

  // Eliminar comentarios relacionados a las tareas
  if (tasks.deletedCount > 0) {
    await Comment.deleteMany({ taskId: { $in: tasks.map(task => task._id) } });
  }

  next();
});

// Middleware: Al eliminar una tarea, elimina los comentarios relacionados
TaskSchema.pre('findOneAndDelete', async function (next) {
  const taskId = this.getQuery()['_id'];
  
  // Eliminar comentarios relacionados
  await Comment.deleteMany({ taskId });

  next();
});

// Exportar modelos
const Project = mongoose.model('Project', ProjectSchema);
const Task = mongoose.model('Task', TaskSchema);
const Comment = mongoose.model('Comment', CommentSchema);

*/