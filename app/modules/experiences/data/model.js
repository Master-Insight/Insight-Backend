import { Schema, model} from 'mongoose'

const thisSchema = new Schema({
  // basic properties
  position:    { type: String,   required: true, },
  company:     { type: String,   required: true, },
  workMode:    { type: String,   required: true, },
  startDate:   { type: String,   required: true, },
  endDate:     { type: String,   required: true, },
  location:    { type: String,   required: true, },
  aptitudes:   [{ type: String }],
  description: { type: String,   required: true, },

  // aditional properties
  user:        { type: Schema.Types.ObjectId, ref: 'users', required: true },

  // data of conection
  created:     { type: Date,   default: Date.now,  immutable: true, },
  updated:     { type: Date,   default: Date.now,  },
  connection:  { type: Date,   default: Date.now,  },
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

const dataModel = model('experiences', thisSchema)

export default dataModel