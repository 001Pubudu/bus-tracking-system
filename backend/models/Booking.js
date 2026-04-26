const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingReference: {
    type: String,
    unique: true
  },
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true
  },
  journeyDate: {
    type: Date,
    required: true
  },
  seatNumbers: [{
    type: Number,
    required: true
  }],
  numberOfSeats: {
    type: Number,
    required: true
  },
  ticketFare: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  discountApplied: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'upi', 'wallet', 'cash'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  bookingStatus: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed', 'no_show'],
    default: 'confirmed'
  },
  passengersDetails: [{
    name: String,
    age: Number,
    gender: String,
    idProof: String
  }],
  checkedIn: {
    type: Boolean,
    default: false
  },
  checkedInAt: Date,
  cancellationReason: String,
  refundAmount: {
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
  },
  journeyCompletedAt: Date
}, { timestamps: true });

// Auto-generate booking reference before saving
bookingSchema.pre('save', async function(next) {
  if (!this.bookingReference) {
    const count = await mongoose.model('Booking').countDocuments();
    this.bookingReference = `BUS${Date.now()}${count}`;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);