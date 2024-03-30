const express = require('express');
const {createUser,loginUserCtrl, getAllUsers, getAUser, deleteAUser} = require('../controller/userCtrl');
const {isAdmin, authMiddleware} = require('../middlewares/authMiddlewares');
const router = express.Router();

router.post("/register",createUser)
router.post("/login", loginUserCtrl)
router.get("/all-users",getAllUsers)
router.post("/",authMiddleware, isAdmin, getAUser)
router.delete("/:id",deleteAUser)


module.exports = router