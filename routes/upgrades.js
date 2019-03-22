const express = require('express');
const router = express.Router();
const upgradeController = require('../controllers/upgradeController');

router.route('/')
  .get(upgradeController.fetchAll)
  .post(upgradeController.create);

router.route('/:id')
  .get(upgradeController.fetch)
  .put(upgradeController.update);

module.exports = router;
