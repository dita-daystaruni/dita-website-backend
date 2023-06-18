const express = require('express');
const {
    createEvent,
    getAllEvents,
    getEvent,
    deleteEvent,
    updateEvent,
} = require('../controllers/eventController');

const router = express.Router();

router.post("/create", createEvent);
router.get("/all", getAllEvents);
router.get("/:id", getEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;