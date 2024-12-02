const User = require('../models/modelUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const phone = req.body.phone;
  const country = req.body.country;
  let imageURL = `http://localhost:3000/${req.file.path}`;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
        name: name,
        phone: phone,
        country: country,
        imageURL: imageURL,
      });
      return user.save();
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: 'User created successfully', userID: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userID: loadedUser._id.toString(),
        },
        'roamridersecretpowerproject',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userID: loadedUser._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUser = async (req, res, next) => {
  try {
    const { userID } = req.body;
    const dataFromDB = await User.findById(userID);
    if (dataFromDB) {
      res.status(202).json(dataFromDB);
    } else {
      res.status(404).json({ error: 'User not found!' });
    }
  } catch (err) {
    throw err;
  }
};

exports.updateUser = async (req, res, next) => {
  const email = req.query.email;
  const { name, country, phone, birthDate, gender, vehicle, language } =
    req.body;
  const filter = { email: email };
  try {
    const date = new Date(birthDate);
    const formattedDate = date.toISOString().split('T')[0];
    const user = await User.findOne(filter);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.name = name;
    user.country = country;
    user.phone = phone;
    user.birthDate = formattedDate;
    user.gender = gender;
    user.vehicle = vehicle;
    user.language = language;
    if (req.file) {
      user.imageURL = `http://localhost:3000/${req.file.path}`;
    }

    await user.save();
  } catch (err) {
    throw err;
  }
};
