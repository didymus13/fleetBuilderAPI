const express = require('express');
const router = express.Router();
const Upgrade = require('../models/Upgrade');

router.route('/')
  .get(function(req, res, next) {
    Upgrade.find(req.query, function(err, upgrades) {
      if (err) return res.json(err)
      return res.json(upgrades)
    })
  })
  .post(function(req, res, next) {
    Upgrade.create(req.body, function(err, upgrade) {
      if (err) return res.json(err)
      return res.json(upgrade)
    })
  });

router.route('/:id')
  .get(function(req, res, next) {
    Upgrade.findById(req.params.id, function(err, upgrade) {
      if (err) return res.json(err)
      if (!upgrade) return res.sendStatus(404)
      return res.json(upgrade)
    })
  })
  .put(function(req, res, next) {
    Upgrade.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, upgrade) {
      if (err) return res.json(err)
      if (!upgrade) return res.sendStatus(404)
      return res.json(upgrade)
    })
  });

module.exports = router;
