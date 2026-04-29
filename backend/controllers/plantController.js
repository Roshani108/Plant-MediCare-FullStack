const Plant = require('../models/Plant');
const Diagnosis = require('../models/Diagnosis');

exports.getPlants = async (req, res) => {
  try {
    const plants = await Plant.find({ user: req.user.id }).sort('-addedAt');
    res.status(200).json({ success: true, count: plants.length, data: plants });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.addPlant = async (req, res) => {
  try {
    req.body.user = req.user.id;
    if (req.file) req.body.photo = '/uploads/' + req.file.filename;
    const plant = await Plant.create(req.body);
    res.status(201).json({ success: true, data: plant });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.updatePlant = async (req, res) => {
  try {
    let plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ success: false, message: 'Plant not found' });
    if (plant.user.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorised' });
    if (req.file) req.body.photo = '/uploads/' + req.file.filename;
    plant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: plant });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ success: false, message: 'Plant not found' });
    if (plant.user.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorised' });
    await Diagnosis.deleteMany({ plant: req.params.id });
    await plant.deleteOne();
    res.status(200).json({ success: true, message: 'Plant deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.logWatering = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.id, { lastWatered: new Date() }, { new: true });
    if (!plant) return res.status(404).json({ success: false, message: 'Plant not found' });
    res.status(200).json({ success: true, data: plant });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
