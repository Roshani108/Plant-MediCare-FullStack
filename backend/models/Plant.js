const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  species: { type: String, default: 'Unknown' },
  emoji: { type: String, default: '🪴' },
  location: { type: String, enum: ['indoor','outdoor','balcony','garden'], default: 'indoor' },
  healthScore: { type: Number, min: 0, max: 100, default: 100 },
  healthStatus: { type: String, enum: ['healthy','warning','critical'], default: 'healthy' },
  notes: { type: String, default: '' },
  lastWatered: { type: Date, default: null },
  photo: { type: String, default: null },
  addedAt: { type: Date, default: Date.now }
});

PlantSchema.pre('save', function(next) {
  if (this.healthScore >= 70) this.healthStatus = 'healthy';
  else if (this.healthScore >= 40) this.healthStatus = 'warning';
  else this.healthStatus = 'critical';
  next();
});

module.exports = mongoose.model('Plant', PlantSchema);
