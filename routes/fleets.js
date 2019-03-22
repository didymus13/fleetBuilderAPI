const express = require('express');
const router = express.Router();
const fleetController = require('../controllers/fleetController')

router.route('/')
  .get(fleetController.fetchAll)
  .post(fleetController.create);

router.route('/:id')
  .get(fleetController.fetch)
  .put(fleetController.update);

module.exports = router;
