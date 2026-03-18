const express = require('express');
const router = express.Router();

const {
    getUpcomingShows,
    getPastShows,
    getShowById
} = require('../controllers/showController');

router.get('/upcoming', getUpcomingShows);

router.get('/past', getPastShows);

router.get('/:id', getShowById)

module.exports = router;