const express = require('express');
const {
    createService,
    getAllServices,
    getService,
    deleteService,
    updateService
} = require ('../controllers/serviceController');

const router = express.Router();

router.post("/create", createService);
router.get("/all", getAllServices);
router.get("/:id", getService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;