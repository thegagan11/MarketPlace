const express = require('express');
const router = express.Router();
const {
    loginUser, 
    getUserProfile, 
    updateUserProfile,
    getAllUsers, // Ensure this is added if it's a part of your userController
    updateUserRole, // Ensure this is added
    deleteUser, // Ensure this is added
    registerUser
} = require('../controllers/userController');

const authenticateToken = require('../middleware/authenticateToken');


// console.log(registerUser);
// console.log(loginUser);
// console.log(getUserProfile);
// console.log(updateUserProfile);
// console.log(getAllUsers);
// console.log(updateUserRole);
// console.log(deleteUser);

router.post('/register', registerUser);
router.post('/login', loginUser);

// Admin-specific routes
// router.get('/admin/users', getAllUsers);

// router.put('/admin/users/:userId/role', authenticateToken(['admin']), updateUserRole);

// router.delete('/admin/users/:userId', authenticateToken(['admin']), deleteUser);

//User profile routes
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);






module.exports = router;
