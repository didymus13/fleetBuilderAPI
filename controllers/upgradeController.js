const Upgrade = require('../models/Upgrade')
const _ = require('lodash')

exports.fetchAll = function(req, res, next) {
  if (req.query.restrictions) {
    req.query = _.assign(req.query, { restrictions: { $in: req.query.restrictions } })
  }
  Upgrade.find(req.query, function(err, upgrades) {
    if (err) return res.json(err)
    return res.json(upgrades)
  })
};

exports.create = function(req, res, next) {
  Upgrade.create(req.body, function(err, upgrade) {
    if (err) return res.json(err)
    return res.json(upgrade)
  })
};

exports.fetch = function(req, res, next) {
  Upgrade.findById(req.params.id, function(err, upgrade) {
    if (err) return res.json(err)
    if (!upgrade) return res.sendStatus(404)
    return res.json(upgrade)
  })
};

exports.update = function(req, res, next) {
  Upgrade.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, upgrade) {
    if (err) return res.json(err)
    if (!upgrade) return res.sendStatus(404)
    return res.json(upgrade)
  })
};
