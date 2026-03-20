const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
    getUpcomingShows,
    getPastShows,
    getShowById,
    getAllShows,
    createShow,
    deleteShow
} = require('../controllers/showController');

router.get('/upcoming', getUpcomingShows);

router.get('/past', getPastShows);

router.get('/:id', getShowById)

router.get('/', getAllShows)

router.post('/', auth, createShow);

router.delete('/:id', auth, deleteShow);

module.exports = router;