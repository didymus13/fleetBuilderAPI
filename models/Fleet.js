const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const _ = require('lodash');

const UpgradeSchema = new Schema({
  upgrade: { type: ObjectId, ref: 'Upgrade', autopopulate: true }
}, { toJSON: { virtuals: true } });

const ShipSchema = new Schema({
  ship: { type: ObjectId, ref: 'Ship', autopopulate: true },
  upgrades: [ UpgradeSchema ]
}, { toJSON: { virtuals: true } })

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
  total: { type: Number, min: 0 },
  max: { type: Number, default: 400 },
  ships: [ ShipSchema ],
}, { toJSON: { virtuals: true } });

// Fleet Plugins
FleetSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Fleet', FleetSchema);
