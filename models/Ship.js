const mongoose = require('mongoose')

const ShipSchema = mongoose.Schema({
  name: { type: String, required: true },
  size: {
    type: String,
    required: true,
    validator: function(v) {
      return /F|S|M|L|H/.test(v)
    }
  },
  cost: { type: Number, required: true, min: 1 },
  faction: {
    type: String,
    required: true,
    validator: function(v) {
      return /rebel|imperial/.test(v)
    }
  },
  slots: [String],
  image: { type: String, required: true },
  isUnique: { type: Boolean, default: false }
})
module.exports = mongoose.model('Ship', ShipSchema)
