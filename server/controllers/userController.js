
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Compare the provided password with the stored password hash
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Generate a token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.TOKEN_SECRET);
    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = await User.create({ username, email, passwordHash, role });
    // Generate a token
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.TOKEN_SECRET);
    res.status(201).json({ token, role: newUser.role });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// const getUserProfile = async (req, res) => {

//   console.log("getUserProfile");
//   const userId = req.user.id;
//   console.log("userId", userId);
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }


//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

const getUserProfile = async (req, res) => {
  const userId = req.user.id;
  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      // Destructure the user object to separate sensitive information and rest of the data
      const { password_hash, ...userWithoutPassword } = user;

      // Return the user data excluding the password_hash
      res.json(userWithoutPassword);
  } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};



const updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const { username, email, bio, profilePicture } = req.body;
  try {
    const updatedUser = await User.updateProfile(userId, { username, email, bio, profilePicture });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  try {
    const updatedUser = await User.updateRole(userId, role);
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.deleteUser(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
};