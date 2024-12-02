const express = require('express');
const controllerPost = require('../controllers/controllerPost');
const api = require('../controllers/api');
const isAuth = require('../middleware/auth');
const router = express.Router();

router.get('/api', api.getAPI);

router.post('/createPost', isAuth, controllerPost.createPost);

router.get('/getPost/:postID', controllerPost.getPost);

router.get('/getAllPost', controllerPost.getAllPost);

router.put('/updatedPostInCreate/:postID/:day', controllerPost.updatePost);

router.post('/auth', isAuth);

module.exports = router;
