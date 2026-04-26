const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: [true, 'Please provide route name']
  },
  routeNumber: {
    type: String,
    required: [true, 'Please provide route number'],
    unique: true
  },
  source: {
    name: {
      type: String,
      required: true
    },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: [Number] // [longitude, latitude]
    }
  },
  destination: {
    name: {
      type: String,
      required: true
    },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: [Number] // [longitude, latitude]
    }
  },
  stops: [{
    stopName: String,
    sequence: Number,
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: [Number]
    },
    estimatedArrival: String,
    waitTime: Number // in minutes
  }],
  schedule: {
    monday: { departureTime: String, isActive: Boolean },
    tuesday: { departureTime: String, isActive: Boolean },
    wednesday: { departureTime: String, isActive: Boolean },
    thursday: { departureTime: String, isActive: Boolean },
    friday: { departureTime: String, isActive: Boolean },
    saturday: { departureTime: String, isActive: Boolean },
    sunday: { departureTime: String, isActive: Boolean }
  },
  distance: {
    type: Number, // in kilometers
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  baseFare: {
    type: Number, // base fare amount
    required: true
  },
  farePerKm: {
    type: Number, // per kilometer charge
    required: true
  },
  assignedBuses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus'
  }],
  isActive: {
    type: Boolean,
    default: true
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

// Create geospatial index
routeSchema.index({ 'source.coordinates': '2dsphere' });
routeSchema.index({ 'destination.coordinates': '2dsphere' });
routeSchema.index({ 'routeNumber': 1 });

module.exports = mongoose.model('Route', routeSchema);