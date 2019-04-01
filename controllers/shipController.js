const Ship = require('../models/Ship');

exports.fetchAll = function(req, res, next)  {
  Ship.find(req.query, function(err, ships) {
    if (err) return res.json(err)
    return res.json(ships)
  })
};

exports.create = function(req, res, next)  {
  Ship.create(req.body, function( err, ship) {
    if (err) return res.json(err);
    return res.json(ship);
  });
};

exports.fetch = function(req, res, next) {
  Ship.findById(req.params.id, function(err, ship) {
    if (err) return res.json(err);
    if (!ship) return res.sendStatus(404)
    return res.json(ship);
  });
};

exports.update = function(req, res, next) {
  Ship.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, ship) {
    if (err) return res.json(err)
    return res.json(ship)
  })
};
