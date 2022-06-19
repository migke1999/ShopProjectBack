
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller'); 





/**
 * Get all users
 */
router.get('/getall', userController.getAllUsers );

/**
 * Get users by name
 */

router.get('/find', userController.getUserById );


/**
 * Function to create a  new user
 */
router.post("/create", userController.createUser);


/**
 * Function to change a value from an especific user
 */
router.post("/change", userController.updateUser );

router.get('/delete', userController.deleteUser);


module.exports = router;
