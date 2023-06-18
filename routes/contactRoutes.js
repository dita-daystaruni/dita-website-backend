const express = require('express');
const {
    createContact,
    getAllContacts,
    getContact,
    deleteContact,
    updateContact
} = require('../controllers/contactController');

const router = express.Router();

router.post("/create", createContact);
router.get("/all", getAllContacts);
router.get("/:id", getContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;