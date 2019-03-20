const express = require('express');
const router = express.Router();
const Fleet = require('../models/Fleet')

router.route('/')
  .get(function(req, res, next) {
    Fleet.find(req.query, function(err, fleets) {
      if (err) return res.json(err)
      return res.json(fleets)
    }).populate(['ships.source', 'ships.upgrades.source'])
  })
  .post(function(req, res, next) {
    Fleet.create(req.body, function(err, fleet) {
      if (err) return res.json(err)
      return res.json(fleet)
    }).populate(['ships.source', 'ships.upgrades.source'])
  });

router.route('/:id')
  .get(function(req, res, next) {
    Fleet.findById(req.params.id, function(err, fleet) {
      if (err) return res.json(err)
      if (!fleet) return res.sendStatus(404)
      return res.json(fleet)
    }).populate(['ships.source', 'ships.upgrades.source'])
  })
  .put(function(req, res, next) {
    Fleet.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, fleet) {
      if (err) return res.json(err)
      if (!fleet) return res.sendStatus(404)
      return res.json(fleet)
    }).populate(['ships.source', 'ships.upgrades.source'])
  });

module.exports = router;
