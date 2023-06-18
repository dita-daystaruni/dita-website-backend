const express = require('express');
const {
    createStatement,
    getAllStatements,
    getStatement,
    deleteStatement,
    updateStatement,
} = require ('../controllers/statementController');

const router = express.Router();

router.post("/create", createStatement);
router.get("/all", getAllStatements);
router.get("/:id", getStatement);
router.put("/:id", updateStatement);
router.delete("/:id", deleteStatement);

module.exports = router;