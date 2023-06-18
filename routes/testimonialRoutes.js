const express = require('express');
const {
    createTestimonial,
    getAllTestimonials,
    getTestimonials,
    deleteTestimonial,
    updateTestimonial,
} = require('../controllers/testimonialController');

const router = express.Router();

router.post("/create", createTestimonial);
router.get("/all", getAllTestimonials);
router.get("/:id", getTestimonials);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);

module.exports = router;