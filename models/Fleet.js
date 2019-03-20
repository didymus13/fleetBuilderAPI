const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const _ = require('lodash');

const UpgradeSchema = new Schema({
  source: { type: ObjectId, ref: 'Upgrade' }
});

const ShipSchema = new Schema({
  source: { type: ObjectId, ref: 'Ship' },
  upgrades: [UpgradeSchema]
}, { toJSON: { virtuals: true } })
ShipSchema.virtual('total').get(function() {
  return _.sumBy(this.upgrades, 'source.cost') + this.source.cost
})

const FleetSchema = new Schema({
  name: { type: String, default: 'New fleet' },
  faction: {
    type: String,
    required: true,
    validator: function(v) {
      return /rebel|imperial/.test(v)
    }
  },
  max: { type: Number, default: 400 },
  ships: [ShipSchema]
}, { toJSON: { virtuals: true } });
FleetSchema.virtual('total').get(function() {
  return _.sumBy(this.ships, 'total')
});
FleetSchema.virtual('isValid').get(function() {
  return this.max >= this.total
})

module.exports = mongoose.model('Fleet', FleetSchema);
