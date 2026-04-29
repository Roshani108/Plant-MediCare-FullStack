const express = require('express');
const router = express.Router();
const { diagnose, getHistory, getPlantDiagnoses } = require('../controllers/diagnosisController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(protect);
router.post('/', upload.single('image'), diagnose);
router.get('/history', getHistory);
router.get('/plant/:id', getPlantDiagnoses);

module.exports = router;
