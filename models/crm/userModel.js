const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: false,
      default: 'https://cdn-icons-png.flaticon.com/512/3541/3541871.png'
    },
    token: {
      type: String,
      trim: true
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    roles: {
      type: [String],
      enum: ['admin', 'superadmin'],
      default: ['admin']
    }
  },
  {
    timestamps: true,
    collection: 'User'
  }
)

adminSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
  }
})

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin
