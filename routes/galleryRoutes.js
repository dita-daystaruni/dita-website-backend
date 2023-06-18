const express = require('express');
const {
    createGallery,
    getAllGalleries,
    getGallery,
    deleteGallery,
    updateGallery,
} = require('../controllers/galleryController');

const router = express.Router();

router.post("/create", createGallery);
router.get("/all", getAllGalleries);
router.get("/:id", getGallery);
router.put("/:id", updateGallery);
router.delete("/:id", deleteGallery);

module.exports = router;