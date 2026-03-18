const mongoose = require('mongoose');

// This defines the structure of a single "Show" document
const showSchema = new mongoose.Schema({
  // FRONT CARD DATA
  headliner: { 
    type: String, 
    required: [true, 'Please add a headliner name'] 
  },
  venue: { 
    type: String, 
    required: [true, 'Which Southampton venue is this at?'] 
  },
  date: { 
    type: Date, 
    required: [true, 'Gigs need a date and time'] 
  },
  flyer: { 
    type: String, 
    default: 'https://via.placeholder.com/400x600?text=No+Flyer+Yet' 
  },

  // DETAILED PAGE DATA
  supports: { 
    type: [String], // Allows you to list multiple bands: ["Band A", "Band B"]
    default: [] 
  },
  description: { 
    type: String, 
    trim: true 
  },
  ticketUrl: { 
    type: String, 
    trim: true 
  },
  spotifyArtistId: { 
    type: String, 
    trim: true 
  },

  // AUTO-GENERATED DATA
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Show', showSchema);

{
    "headliner": "Longgoodbye",
    "supports": ["Cruelty", "Emancipation", "Sanguine Rose", "Instrument of God"],
    "venue": "Edmund Kell Church",
    "date": "2026-04-17T18:30:00.000Z",
    "description": "FRIDAY 17TH OF APRIL £12 LONG GOODBYE:\n\nTickets selling fast...\n\nAll ages, notaflof, dance hall vibes, mosh metal all evening. £12 adv £14 on the door. Doors half 6, first band on at 7pm. Small capacity fill out the space. Southampton Hardcore\n\nInstrument of God (new SOHC metalcore)\nSanguine Rose (Essex Daedric Artifact mosh)\nEmancipation (Nottingham UYC throwback metal)\nCruelty (Brum x Soton depopulation music)\nLong Goodbye (TCS flag bearers)",
    "ticketUrl": "https://onadebt.bigcartel.com/product/friday-april-17th-long-goodbye-edmund-kell-unitarian-church-12",
    "spotifyArtistId": "2yfv45UhAaHIGmrnvstbb2",
    "flyer": "https://res.cloudinary.com/dxh6odohl/image/upload/v1773851102/longgoodbye_quoru2.webp"
}