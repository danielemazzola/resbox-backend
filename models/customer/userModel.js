const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    lastname: {
      type: String,
      required: true,
      trim: true
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
    purchasedBoxes: [
      {
        box: {
          type: mongoose.Types.ObjectId,
          ref: 'Box'
        },
        remainingItems: {
          type: Number,
          required: true
        }
      },
      { timestamps: true }
    ]
  },
  {
    timestamps: true,
    collection: 'User'
  }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
