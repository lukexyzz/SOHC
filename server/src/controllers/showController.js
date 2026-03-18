const Show = require('../models/Show.js');
const mongoose = require('mongoose');
const spotifyService = require('../services/spotifyService.js');

exports.getUpcomingShows = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const shows = await Show.find({ date: { $gte: today } }).sort({ date:1});

        res.status(200).json(shows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching upcoming SOHC gig", error: error.message });
    }
};

exports.getPastShows = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const shows = await Show.find({ date: {$lt: today} }).sort({ date: -1});

        res.status(200).json(shows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching past show archive", error: error.message});
    }
};

exports.getShowById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Show ID format"});
        }

        const show = await Show.findById(id);

        if (!show) {
            return res.status(404).json({ message: "show not found in the database"});
        }

        let tracks = [];
        if (show.spotifyArtistId) {
            console.log("Found Artist ID:", show.spotifyArtistId);
            tracks = await spotifyService.getArtistTopTracks(show.spotifyArtistId);
        }

        res.status(200).json({
            ...show._doc,
            spotifyTracks: tracks
        });

    } catch (error) {
        res.status(500).json({ message: "error retrieving show details", error: error.message});
    }
};

exports.getAllShows = async (req, res) => {
  try {
    const shows = await Show.find().sort({ date: 1 }); // Sorts by date (soonest first)
    res.status(200).json(shows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shows", error: error.message });
  }
};