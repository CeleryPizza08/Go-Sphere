const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/modelUser');
const { body } = require('express-validator');

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (value, { req }) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject('This email has already exists!');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 6 }),
    body('name').trim().notEmpty(),
  ],
  authController.signup
);

router.post('/login', authController.login);

router.post('/getUser', authController.getUser);

router.put('/updateUser', authController.updateUser);

module.exports = router;
