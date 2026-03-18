const Show = require('../models/Show');
const mongoose = require('mongoose');

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

        res.status(200).json(show);
    } catch (error) {
        res.status(500).json({ message: "error retrieving show details", error: error.message});
    }
};
