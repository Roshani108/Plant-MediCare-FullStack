const mongoose = require('mongoose');
const Plant = require('../models/Plant');
const Diagnosis = require('../models/Diagnosis');

const inMemoryPlants = global._inMemoryPlants || (global._inMemoryPlants = []);

exports.getPlants = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const plants = await Plant.find({ user: req.user.id }).sort('-addedAt');
      return res.status(200).json({ success: true, count: plants.length, data: plants });
    }
    const userId = req.user.id || req.user._id;
    const plants = inMemoryPlants.filter(p => p.user === userId);
    res.status(200).json({ success: true, count: plants.length, data: plants });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.addPlant = async (req, res) => {
  try {
    req.body.user = req.user.id || req.user._id;
    if (req.file) req.body.photo = '/uploads/' + req.file.filename;

    if (mongoose.connection.readyState === 1) {
      const plant = await Plant.create(req.body);
      return res.status(201).json({ success: true, data: plant });
    }

    const newPlant = {
      _id: 'plant_' + Date.now(),
      ...req.body,
      healthStatus: 'healthy',
      healthScore: 85,
      addedAt: new Date()
    };
    inMemoryPlants.push(newPlant);
    res.status(201).json({ success: true, data: newPlant });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.updatePlant = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    if (mongoose.connection.readyState === 1) {
      let plant = await Plant.findById(req.params.id);
      if (!plant) return res.status(404).json({ success: false, message: 'Plant not found' });
      if (plant.user.toString() !== userId) return res.status(403).json({ success: false, message: 'Not authorised' });
      if (req.file) req.body.photo = '/uploads/' + req.file.filename;
      plant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      return res.status(200).json({ success: true, data: plant });
    }

    const index = inMemoryPlants.findIndex(p => p._id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Plant not found' });
    Object.assign(inMemoryPlants[index], req.body);
    res.status(200).json({ success: true, data: inMemoryPlants[index] });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.deletePlant = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const plant = await Plant.findById(req.params.id);
      if (!plant) return res.status(404).json({ success: false, message: 'Plant not found' });
      if (plant.user.toString() !== (req.user.id || req.user._id)) return res.status(403).json({ success: false, message: 'Not authorised' });
      await Diagnosis.deleteMany({ plant: req.params.id });
      await plant.deleteOne();
      return res.status(200).json({ success: true, message: 'Plant deleted' });
    }

    const index = inMemoryPlants.findIndex(p => p._id === req.params.id);
    if (index !== -1) inMemoryPlants.splice(index, 1);
    res.status(200).json({ success: true, message: 'Plant deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.logWatering = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const plant = await Plant.findByIdAndUpdate(req.params.id, { lastWatered: new Date() }, { new: true });
      if (!plant) return res.status(404).json({ success: false, message: 'Plant not found' });
      return res.status(200).json({ success: true, data: plant });
    }

    const plant = inMemoryPlants.find(p => p._id === req.params.id);
    if (plant) plant.lastWatered = new Date();
    res.status(200).json({ success: true, data: plant });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
