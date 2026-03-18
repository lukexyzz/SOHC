const express = require('express');
const router = express.Router();

const {
    getUpcomingShows,
    getPastShows,
    getShowById,
    getAllShows
} = require('../controllers/showController');

router.get('/upcoming', getUpcomingShows);

router.get('/past', getPastShows);

router.get('/:id', getShowById)

router.get('/', getAllShows)

module.exports = router;