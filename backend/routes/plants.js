const express = require('express');
const router = express.Router();
const { getPlants, addPlant, updatePlant, deletePlant, logWatering } = require('../controllers/plantController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(protect);
router.route('/').get(getPlants).post(upload.single('photo'), addPlant);
router.route('/:id').put(upload.single('photo'), updatePlant).delete(deletePlant);
router.put('/:id/water', logWatering);

module.exports = router;
