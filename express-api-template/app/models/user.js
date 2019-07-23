const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: 
    {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    phone: 
    {
        type: String,
        required: true,
        unique: true
    },
    address:
    {
      city: 
      {
        type: String,
        required: true
      },
      district: 
      {
        type: String,
        required: true
      }
    },
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: "Category"}],
    servicesLog: [{type: mongoose.Schema.Types.ObjectId, ref: "Request"}],
    hashedPassword: 
    {
      type: String,
      required: true
    },
    token: String
  }, 
  {
    timestamps: true,
    toObject: {
      // remove `hashedPassword` field when we call `.toObject`
      transform: (_doc, user) => {
        delete user.hashedPassword
        return user
      }
    }
  }
)

// userSchema.virtual('examples', {
//   ref: 'Example',
//   localField: '_id',
//   foreignField: 'owner'
// });

module.exports = mongoose.model('User', userSchema)
