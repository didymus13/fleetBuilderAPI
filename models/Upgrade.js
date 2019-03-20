const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UpgradeSchema = new Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true, min: 1 },
  type: {
    type: String,
    required: true,
    validator: function(v) {
      const types = ['title', 'officer', 'weapons team', 'offensive retrofit', 'ordnance', 'ion cannon', 'turbolasers']
      return 0 > types.indexOf(v)
    }
  },
  image: { type: String, required: true },
  isUnique: { type: Boolean, default: false }
});

module.exports = mongoose.model('Upgrade', UpgradeSchema)
