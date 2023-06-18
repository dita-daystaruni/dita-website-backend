const express = require('express');
const {
    createLeader,
    getAllLeaders,
    getLeader,
    updateLeader,
    deleteLeader
} = require('../controllers/leadershipController');

const router = express.Router();

router.post("/create", createLeader);
router.get("/all", getAllLeaders);
router.get("/:id", getLeader);
router.put("/:id", updateLeader);
router.delete("/:id", deleteLeader);

module.exports = router;