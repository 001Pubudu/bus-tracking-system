const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: [Number] // [longitude, latitude]
  },
  speed: {
    type: Number, // in km/h
    default: 0
  },
  heading: {
    type: Number, // in degrees (0-360)
    default: 0
  },
  accuracy: {
    type: Number, // in meters
    default: 0
  },
  altitude: {
    type: Number, // in meters
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
    expires: 604800 // Auto-delete after 7 days (7 * 24 * 60 * 60 seconds)
  }
});

// Create geospatial index for efficient location queries
locationSchema.index({ 'coordinates': '2dsphere' });
locationSchema.index({ 'bus': 1, 'timestamp': -1 });

module.exports = mongoose.model('Location', locationSchema);