const express = require('express');
const postRoutes = require('./routes/post');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/user');
const multer = require('multer');

const app = express();
const port = 3000;

const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'image');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(cors());
app.use(bodyParser.json());
app.use('/image', express.static(path.join(__dirname, 'image'))); // Serve the 'images' directory
app.use(
  multer({ storage: filestorage, fileFilter: fileFilter }).single('image')
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('', postRoutes);
app.use('/user', userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});
mongoose
  .connect(
    'mongodb+srv://wong1833:Wongzc_1833@cluster0.msgv2xp.mongodb.net/RoamRider?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
