const express = require('express');
const router = express.Router();
const shipController = require('../controllers/shipController')

router.route('/')
  .get(shipController.fetchAll)
  .post(shipController.create);

router.route('/:id')
  .get(shipController.fetch)
  .put(shipController.update);

module.exports = router;
