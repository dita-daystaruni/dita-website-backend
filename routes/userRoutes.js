const express = require('express');
const {
    createUser,
    getAllUsers,
    deleteUser,
    updateUser,
    loginUser
} = require('../controllers/userController');
const { checkUser } = require('../middleware/authMiddleware');

const router = express.Router();

/* router.get("*", checkUser); */
router.post("/create" ,createUser);
router.post("/login", loginUser);
router.get("/all", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;