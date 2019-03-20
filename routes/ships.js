const express = require('express');
const router = express.Router();
const Ship = require('../models/Ship');

router.route('/')
  .get(function(req, res, next) {
    Ship.find(req.query, function(err, ships) {
      if (err) return res.json(err)
      return res.json(ships)
    })
  })
  .post(function(req, res, next) {
    const ship = new Ship(req.body)
    ship.save(function( err, ship) {
      if (err) return res.json(err);
      return res.json(ship);
    });
  });

router.route('/:id')
  .get(function(req, res, next) {
    Ship.findById(req.params.id, function(err, ship) {
      if (err) return res.json(err);
      if (!ship) return res.sendStatus(404)
      return res.json(ship);
    });
  })
  .put(function(req, res, next) {
    Ship.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, ship) {
      if (err) return res.json(err)
      return res.json(ship)
    })
  })
  .delete(function(req, res, next) {
    Ship.findByIdAndDelete(req.params.id, function(err, ship) {
      if (err) return res.json(err)
      return res.json(ship)
    })
  })
module.exports = router;
