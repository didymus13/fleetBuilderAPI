const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const _ = require('lodash');

const UpgradeSchema = new Schema({
  upgrade: { type: ObjectId, ref: 'Upgrade', autopopulate: true }
});

const ShipSchema = new Schema({
  ship: { type: ObjectId, ref: 'Ship', autopopulate: true },
  upgrades: [ UpgradeSchema ]
}, { toJSON: { virtuals: true } })
ShipSchema.virtual('total').get(function() {
  return _.sumBy(this.upgrades, 'upgrade.cost') + this.ship.cost
})

// Fleet
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
  ships: [ ShipSchema ],
}, { toJSON: { virtuals: true } });

// Fleet virtuals
FleetSchema.virtual('total').get(function() {
  return _.sumBy(this.ships, 'total')
});
FleetSchema.virtual('isValid').get(function() {
  return this.max >= this.total
})

// Fleet Plugins
FleetSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Fleet', FleetSchema);
