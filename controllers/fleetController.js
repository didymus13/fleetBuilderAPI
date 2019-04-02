const Fleet = require('../models/Fleet');

exports.fetchAll = function(req, res, next) {
  Fleet.find(req.query, function(err, fleets) {
    if (err) return res.json(err)
    return res.json(fleets)
  })
};

exports.create = async function(req, res, next) {
  const fleet = await Fleet.create(req.body)
  return res.json(fleet)
};

exports.fetch = function(req, res, next) {
  Fleet.findById(req.params.id, function(err, fleet) {
    if (err) return res.json(err)
    if (!fleet) return res.sendStatus(404)
    return res.json(fleet)
  })
};

exports.update = function(req, res, next) {
  Fleet.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, fleet) {
    if (err) return res.json(err)
    if (!fleet) return res.sendStatus(404)
    return res.json(fleet)
  })
};

exports.destroy = function(req, res, next) {
  Fleet.findByIdAndDelete(req.params.id, (err, fleet) => {
    if (err) return res.json(err)
    if (!fleet) return res.sendStatus(404)
    return res.sendStatus(204)
  })
}
