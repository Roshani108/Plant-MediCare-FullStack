// models/Diagnosis.js
const mongoose = require('mongoose');

const DiagnosisSchema = new mongoose.Schema({
  plant: { 
    type: mongoose.Schema.ObjectId, 
    ref: 'Plant', 
    default: null 
  },
  user: { 
    type: mongoose.Schema.ObjectId, 
    ref: 'User', 
    required: true 
  },
  disease: { 
    type: String, 
    required: true 
  },
  confidence: { 
    type: Number, 
    default: 0 
  },
  severity: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'low' 
  },
  description: { type: String },
  causes: [{ type: String }],

  // ✅ CORRECT SCHEMA for products, treatments, diy
  treatments: [{
    step: { type: String },
    detail: { type: String }
  }],

  products: [{
    name: { type: String },
    type: { type: String },
    description: { type: String },
    emoji: { type: String }
  }],

  diy: [{
    title: { type: String },
    instructions: { type: String }
  }],

  prevention: { type: String },
  recoveryTime: { type: String },
  imageUrl: { 
    type: String, 
    required: true 
  },
  diagnosedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Diagnosis', DiagnosisSchema);