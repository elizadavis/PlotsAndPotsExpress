const mongoose = require('mongoose')

const potSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  plantType: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps: true,
  toObject: {
    virtuals: true
  }
})

module.exports = mongoose.model('Pot', potSchema)
