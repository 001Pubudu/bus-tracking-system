const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: [true, 'Please provide bus number'],
    unique: true
  },
  registrationNumber: {
    type: String,
    required: [true, 'Please provide registration number'],
    unique: true
  },
  capacity: {
    type: Number,
    required: [true, 'Please provide bus capacity'],
    min: 1
  },
  currentPassengers: {
    type: Number,
    default: 0,
    min: 0
  },
  type: {
    type: String,
    enum: ['economy', 'comfort', 'luxury'],
    default: 'comfort'
  },
  status: {
    type: String,
    enum: ['idle', 'running', 'maintenance', 'offline'],
    default: 'idle'
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  coDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: [Number] // [longitude, latitude]
  },
  currentRoute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route'
  },
  amenities: [{
    name: String,
    available: Boolean
  }],
  documents: {
    insuranceExpiry: Date,
    pollutionExpiry: Date,
    fitnessExpiry: Date
  },
  lastMaintenanceDate: Date,
  totalKilometers: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create geospatial index for location
busSchema.index({ 'location': '2dsphere' });
busSchema.index({ 'busNumber': 1 });
busSchema.index({ 'registrationNumber': 1 });

module.exports = mongoose.model('Bus', busSchema);