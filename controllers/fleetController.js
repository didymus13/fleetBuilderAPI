const Fleet = require('../models/Fleet');

exports.fetchAll = function(req, res, next) {
  Fleet.find(req.query, function(err, fleets) {
    if (err) return res.json(err)
    return res.json(fleets)
  }).populate(['ships.source', 'ships.upgrades.source'])
};

exports.create = function(req, res, next) {
  Fleet.create(req.body, function(err, fleet) {
    if (err) return res.json(err)
    return res.json(fleet)
  }).populate(['ships.source', 'ships.upgrades.source'])
};

exports.fetch = function(req, res, next) {
  Fleet.findById(req.params.id, function(err, fleet) {
    if (err) return res.json(err)
    if (!fleet) return res.sendStatus(404)
    return res.json(fleet)
  }).populate(['ships.source', 'ships.upgrades.source'])
};

exports.update = function(req, res, next) {
  Fleet.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, fleet) {
    if (err) return res.json(err)
    if (!fleet) return res.sendStatus(404)
    return res.json(fleet)
  }).populate(['ships.source', 'ships.upgrades.source'])
};
