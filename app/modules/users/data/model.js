import { Schema, model} from 'mongoose'
import { DOCTYPE, ROLES, } from '../../utils/valueList.js';

const userSchema = new Schema({
  // basic properties
  given_name:  { type: String,   required: true, maxLength: 50 },
  family_name: { type: String,   required: true, maxLength: 50 },
  full_name:   { type: String,   },
  username:    { type: String,   unique: true  },
  email:       { type: String,   required: true, match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Debe completar un email valido'], unique: true },
  password:    { type: String,   required: true },
  role:        { type: String,   default: "User", enum: ROLES,},
  document:    { type: String,   maxLength: 15 },
  documenttype:{ type: String,   enum: DOCTYPE },

  // contact info
  phone:       { type: String, maxLength: 20   },

  // aditional properties
  photo:               String,
  bio:                 String,
  birthday:            Date,
  public:      { type: Boolean,   default: true},

  // external Auth
  linkedinId:          String,
  linkedinVerified:    Boolean,
  linkedinAccessToken: String,
  linkedinTokenExpiry: Number,
  
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

// Middleware que se ejecuta antes de guardar el documento
userSchema.pre('save', function(next) {
  if (!this.username && this._id) {
    this.username = `${this.given_name}_${this._id.toString()}`.toLowerCase();
  }
  if (!this.full_name) {
    this.full_name = `${this.given_name} ${this.family_name}`;
  }
  next();
});

// Middleware que se ejecuta después de guardar un usuario
// userSchema.post('save', function(doc, next) {
//   if (!doc.full_name) {
//     doc.full_name = `${doc.given_name} ${doc.family_name}`;
//     doc.save();
//   }
//   next();
// });

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const dataModel = model('users', userSchema)

export default dataModel